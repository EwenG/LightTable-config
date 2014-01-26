(ns ewen
  (:require [lt.object :refer [object* behavior*] :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.objs.files :as files]
            [lt.objs.tabs :as tabs]
            [lt.objs.context :as ctx]
            [lt.plugins.paredit :as paredit]
            [amalloy.ring-buffer :refer [ring-buffer]]
            [cljs.core.match :as core.match])
  (:require-macros [lt.macros :refer [behavior]]
                   [cljs.core.match.macros :refer [match]]))

(defn paired-scan [{:keys [dir ed loc for negation allow-end? allow-strings? only-for? for-length] :as opts}]
    (let [[stack-chars stack-ends] (if (= dir :left)
                                     [paredit/form-end paredit/form-start]
                                     [paredit/form-start paredit/form-end])
          final-loc (paredit/end-loc ed)
          search-range [(- (:line loc) 100) (+ (:line loc) 100)]
          for-length (if for-length for-length 1)]
      (loop [cur loc
             line (editor/line ed (:line loc))
             stack []
             ch-stack (ring-buffer for-length)]
        (if (or (not cur)
                (not line)
                (not (paredit/within-range search-range cur)))
          nil
          (let [ch (get line (:ch cur))
                ch-stack (conj ch-stack ch)
                ch-str (reduce str ch-stack)
                next-loc (paredit/move-loc ed cur dir)
                next-line (if (not= (:line cur) (:line next-loc))
                            (editor/line ed (:line next-loc))
                            line)
                valid? (not (paredit/string|comment? ed cur allow-strings?))
                stackable? (not (paredit/string|comment? ed cur))]
            (cond
             (and allow-end?
                  valid?
                  (or (= final-loc cur)
                      (not= next-line line))) (if (= dir :right)
                                              [ch (editor/adjust-loc cur 1)]
                                              [ch {:line (:line cur) :ch -1}])
             (and ch
                  (re-seq for ch-str)
                  valid?
                  (not (seq stack))
                  (if negation
                    (negation line cur)
                    true)) [ch cur]

             (and ch
                  (not only-for?)
                  paredit/stackable?
                  (re-seq stack-ends ch-str)
                  (not= ch (-> stack last paredit/opposites))) nil

             :else (recur next-loc next-line (cond
                                              (and ch paredit/stackable? (re-seq stack-chars ch)) (conj stack ch)
                                              (and ch paredit/stackable? (= ch (-> stack last paredit/opposites))) (pop stack)
                                              :else stack)
                          ch-stack)))))))

  (defn select-parent [ed]
                      (when ed
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (paredit/ed->info ed)
                            (paredit/select nil)
                            (paredit/batched-edits))))


  (defn move-loc [ed dir]
    (-> ed (paredit/move-loc (:loc (paredit/ed->info ed)) dir)))

  (defn select [{:keys [ed loc] :as orig} [start end]]
    (update-in orig [:edits] conj
               {:type :cursor
                :from start
                :to (editor/adjust-loc end 1)}))


  (defn get-char
    ([ed loc]
     (editor/range ed (editor/adjust-loc loc -1) loc))
    ([ed loc dir]
     (if (> dir 0)
       (editor/range ed loc (editor/adjust-loc loc dir))
       (editor/range ed (editor/adjust-loc loc dir) loc))))


  (defn word-boundary [ed loc]
    (let [[c start] (paired-scan
                     {:dir :left
                      :ed ed
                      :allow-end? false
                      :loc (paredit/move-loc ed loc :left)
                      :for #"[\s\)\}\]\"\(\{\[(#_)]"
                      :for-length 2})
          start (if start (paredit/move-loc ed start :right) nil)
          [c end] (if-not c
                    [nil nil]
                    (paired-scan {:dir :right
                                  :ed ed
                                  :allow-end? false
                                  :loc start
                                  :for #"[\s\)\}\]\"\(\{\[]"}))
          end (if end (paredit/move-loc ed end :left) nil)
          end (if (and end (> (:line end) (:line start))) (paredit/move-loc ed end :left) end)]
      (if (and start end) [start end] nil)))


  (defn select-at-point [ed]
    (let [[at-point after] [(editor/get-char ed -1) (editor/get-char ed 1)]
          loc (-> ed paredit/ed->info :loc)
          left-loc (-> ed (move-loc :left))
          ed-info (paredit/ed->info ed)
          boundaries (match [at-point after]
                            [")" _] (paredit/form-boundary ed left-loc nil)
                            ["]" _] (paredit/form-boundary ed left-loc nil)
                            ["}" _] (paredit/form-boundary ed left-loc nil)
                            ["" _] nil
                            [" " _] nil
                            [_ ""] (word-boundary ed left-loc)
                            [_ " "] (word-boundary ed left-loc)
                            [_ ")"] (word-boundary ed left-loc)
                            [_ "]"] (word-boundary ed left-loc)
                            [_ "}"] (word-boundary ed left-loc)
                            :else nil)
          selection (if (first boundaries)
                      (select ed-info boundaries)
                      ed-info)]
      (when selection (paredit/batched-edits selection))))


  (defn normalize-boundary [{:keys [from to]}]
    [from to])

  (defn min-loc [{l1 :line ch1 :ch :as loc1} {l2 :line ch2 :ch :as loc2}]
    (cond (nil? loc1) loc2
          (nil? loc2) loc1
          (< l1 l2) loc1
          (< l2 l1) loc2
          (< ch1 ch2) loc1
          (<= ch2 ch1) loc2))

  (defn max-loc [{l1 :line ch1 :ch :as loc1} {l2 :line ch2 :ch :as loc2}]
    (cond (nil? loc1) loc2
          (nil? loc2) loc1
          (< l1 l2) loc2
          (< l2 l1) loc1
          (< ch1 ch2) loc2
          (<= ch2 ch1) loc1))

  (defn merge-boundaries
    ([[start1 end1] [start2 end2]]
     (let [[start end] [(min-loc start1 start2) (max-loc end1 end2)]]
       (if (and start end) [start end] nil)))
    ([b1 b2 & boundaries]
     (reduce merge-boundaries (merge-boundaries b1 b2) boundaries)))

   (defn select-next [ed]
     (let [loc (editor/->cursor ed)
           ed-info (paredit/ed->info ed)
           select-boundaries (when (editor/selection? ed)
                               (-> (editor/selection-bounds ed)
                                   normalize-boundary))
           whitespaces-boundaries [loc (-> (paredit/first-non-whitespace
                                            {:ed ed
                                             :loc loc
                                             :dir :right})
                                           second)]
           right-loc (-> whitespaces-boundaries
                         second
                         (editor/adjust-loc 1))
           [bbefore before after aafter] [(get-char ed (second whitespaces-boundaries) -2)
                                          (get-char ed (second whitespaces-boundaries) -1)
                                          (get-char ed (second whitespaces-boundaries) 1)
                                          (get-char ed (second whitespaces-boundaries) 2)]
           boundaries (match [bbefore before after aafter]
                                   [_ _ "(" _] (paredit/form-boundary ed right-loc nil)
                                   [_ _ "[" _] (paredit/form-boundary ed right-loc nil)
                                   [_ _ "{" _] (paredit/form-boundary ed right-loc nil)
                                   [_ _ _ "#_"] [(second whitespaces-boundaries) right-loc]
                                   [_ _ "" _] nil
                                   [_ _ " " _] nil
                                   [_ "(" _ _] (word-boundary ed right-loc)
                                   [_ "[" _ _] (word-boundary ed right-loc)
                                   [_ "{" _ _] (word-boundary ed right-loc)
                                   ["#_" _ _ _] (word-boundary ed right-loc)
                                   [_ "" _ _] (word-boundary ed right-loc)
                                   [_ " " _ _] (word-boundary ed right-loc)
                                   :else nil)
           merged-boundaries (merge-boundaries select-boundaries whitespaces-boundaries boundaries)
           selection (if merged-boundaries
                       (select ed-info merged-boundaries)
                       ed-info)]
       (when selection (paredit/batched-edits selection))))

   (defn move-forward [ed]
     (let [loc (editor/->cursor ed)
           ed-info (paredit/ed->info ed)
           whitespaces-boundaries [loc (-> (paredit/first-non-whitespace
                                            {:ed ed
                                             :loc loc
                                             :dir :right})
                                           second)]
           right-loc (-> whitespaces-boundaries
                         second
                         (editor/adjust-loc 1))
           [bbefore before after aafter] [(get-char ed (second whitespaces-boundaries) -2)
                                          (get-char ed (second whitespaces-boundaries) -1)
                                          (get-char ed (second whitespaces-boundaries) 1)
                                          (get-char ed (second whitespaces-boundaries) 2)]
           boundaries (match [bbefore before after aafter]
                             [_ _ "(" _] (paredit/form-boundary ed right-loc nil)
                             [_ _ "[" _] (paredit/form-boundary ed right-loc nil)
                             [_ _ "{" _] (paredit/form-boundary ed right-loc nil)
                             [_ _ _ "#_"] [(second whitespaces-boundaries) right-loc]
                             [_ _ "" _] nil
                             [_ _ " " _] nil
                             [_ "(" _ _] (word-boundary ed right-loc)
                             [_ "[" _ _] (word-boundary ed right-loc)
                             [_ "{" _ _] (word-boundary ed right-loc)
                             ["#_" _ _ _] (word-boundary ed right-loc)
                             [_ "" _ _] (word-boundary ed right-loc)
                             [_ " " _ _] (word-boundary ed right-loc)
                             :else nil)
           merged-boundaries (merge-boundaries whitespaces-boundaries boundaries)
           selection (if merged-boundaries
                       (select ed-info merged-boundaries)
                       ed-info)]
       (when selection (paredit/batched-edits selection))))

   (defn eval-at-point [ed]
     (when (or (not (::orig-pos @ed))
               (editor/selection? ed))
       (object/merge! ed {::orig-pos (editor/->cursor ed)}))
     (when (not (editor/selection? ed))
       (select-at-point ed))
     (when ed
       (object/raise ed :eval.one)
       (cmd/exec! :editor.selection.clear))
     (when (::orig-pos @ed)
       (editor/move-cursor ed (::orig-pos @ed))
       (object/merge! ed {::orig-pos nil})))




  (cmd/command {:command :ewen.select-at-point
              :desc "select at point"
              :exec #(select-at-point (pool/last-active))})

  (cmd/command {:command :ewen.select-next
              :desc "select next"
              :exec #(select-next (pool/last-active))})

  (cmd/command {:command :ewen.eval-at-point
              :desc "eval at point"
              :exec #(eval-at-point (pool/last-active))})



(comment



(comment "Paried-scan -> Scan for regex??
  negation -> Add a condition for the regex to scan. If the regex is found but the condition is wrong, then the regex is ignored.
  allow-end? -> allow-end of line when scaning for regex?
  allow-strings? -> Ignore the regex if it is in a allow-strings?
  only-for? -> I think, same thing than \"strict mode\" when matching brackets, ie: a paren cannot end a braces for example.")


(cmd/command {:command :ewen.test-scan
                :desc "test scan"
                :exec #(prn (paired-scan {:dir :right
                                  :ed (pool/last-active)
                                  :allow-end? false
                                  :loc (editor/->cursor (pool/last-active))
                                  :for #"[\s\)\}\]\"\(\{\[]"}))})

(cmd/command {:command :ewen.test-bounds
                :desc "test bounds"
                :exec #(prn (word-boundary (pool/last-active) (editor/->cursor (pool/last-active))))})


  (cmd/command {:command :test-scan
                :desc "test-scan"
                :exec #(prn (word-boundary
                             (pool/last-active)
                             (editor/->cursor (pool/last-active))))})

  (cmd/command {:command :test-chars
                :desc "test-chars"
                :exec #(prn [(editor/get-char (pool/last-active) -1)
                             (editor/get-char (pool/last-active) 1)])})








(find-matching-bracket)

(editor/->token-js (editor/->cursor (pool/last-active)))
(.log js/console (:ed @(pool/last-active)))
(object/by-tag :editor)

(def cur (-> (pool/last-active) ed->info :loc))
(.getTokenTypeAt (:ed @(pool/last-active)) (js/CodeMirror.Pos. (:line cur) (- (:ch cur) 2)))

(js/ewen.lt.findMatchingBracket (:ed @(pool/last-active)) (-> @(pool/last-active) :ed (.getCursor)) true)




  (do (def ed
        "The current editor object"
        (pool/last-active)) nil)
  (def cm
    "The CodeMirror JS object"
    (:ed @ed))


  (defn matching-brackets->pos
    "Convert a JS object corresponding to the positions of matching brackets
    into a Lighttable position"
    [match]
    [{:line (-> match (.-from) (.-line)) :ch (-> match (.-from) (.-ch))}
     {:line (-> match (.-to) (.-line)) :ch (-> match (.-to) (.-ch))}])

  (-> (js-obj "from" (js/CodeMirror.Pos. 176 20)
              "to" (js/CodeMirror.Pos. 165 2)
              "match" true
              "forward" false)
      matching-brackets->pos)


  (defn matching-brackets
    "Return the positions of a pair of matching brackets.
    The buffer used is determined by `cm`.
    The starting bracket is at position `cursor` and its matching bracket is searched forward
    if `forward` is true and backward otherwise."
    [cm cursor forward]
    ;Find matching brackets using the Codemirror object `cm`, starting at the cursor position `cursor` and using strict mode.
    (let [matching-brackets (js/ewen.lt.findMatchingBracket cm cursor true)]
      (if (and (not (nil? matching-brackets))
               (= forward (.-forward matching-brackets)))
        (let [[start end] (matching-brackets-pos matching-brackets)
              [start end] (if forward
                            [start (editor/adjust-loc end 1)]
                            [(editor/adjust-loc start 1) end])]
          [start end])
        nil)))

  (matching-brackets cm (js/CodeMirror.Pos. 191 14) false)
  (matching-brackets cm (editor/->cursor ed) false)





(ns lt.plugins.clojure
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.context :as ctx]
            [lt.objs.app :as app]
            [lt.objs.clients.tcp :as tcp]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.deploy :as deploy]
            [lt.objs.console :as console]
            [lt.objs.editor :as ed]
            [lt.objs.connector :as connector]
            [lt.objs.popup :as popup]
            [lt.objs.platform :as platform]
            [lt.plugins.auto-complete :as auto-complete]
            [lt.objs.statusbar :as status]
            [lt.objs.proc :as proc]
            [lt.objs.eval :as eval]
            [lt.objs.notifos :as notifos]
            [lt.plugins.watches :as watches]
            [lt.util.dom :as dom]
            [lt.util.js :as util]
            [lt.util.load :as load]
            [lt.util.cljs :refer [->dottedkw str-contains?]]
            [clojure.string :as string]
            [lt.objs.command :as cmd]
            [lt.objs.plugins :as plugins])
  (:require-macros [lt.macros :refer [behavior defui]]))

(behavior ::on-eval.one
          :triggers #{:eval.one}
          :reaction (fn [editor]
                      (let [code (watches/watched-range editor nil nil (if (object/has-tag? editor :editor.cljs)
                                                                         cljs-watch
                                                                         clj-watch))
                            pos (ed/->cursor editor)
                            info (:info @editor)
                            info (if (ed/selection? editor)
                                   (assoc info
                                     :code (ed/selection editor)
                                     :meta {:start (-> (ed/->cursor editor "start") :line)
                                            :end (-> (ed/->cursor editor "end") :line)
                                            :end-line (+ 1 (-> (ed/->cursor editor "end") :line))
                                            :end-column (-> (ed/->cursor editor "end") :column)
                                            :line (+ 1 (-> (ed/->cursor editor "start") :line))})
                                   (assoc info :pos pos :code code))
                            info (assoc info :print-length (object/raise-reduce editor :clojure.print-length+ nil))]
                        (object/raise clj-lang :eval! {:origin editor
                                                       :info info}))))


"e"


)

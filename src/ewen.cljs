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




(comment

  ring-buffer


  ;Tabs
  (require '[cljs.core])

  (cmd/command {:command :test-command
                :desc "Test command"
                :exec #(prn "g")})

  (prn @lt.object/object-defs)

  (prn @files/files-obj)

  (keys @tabs/multi)
  (keys @(first (:tabsets @tabs/multi)))
  (keys @tabs/tabset)

  (prn (first (:args @(second (second (:widgets @(second (first (first (:args @(second (second (:widgets @(:active-obj @(first (:tabsets @tabs/multi))))))))))))))))
  (object/raise lt.objs.opener/opener :open! "/home/ewen/.emacs")


  (:info @(first (:objs @(first (:tabsets @tabs/multi)))))












;Paredit
(ns lt.plugins.paredit
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.util.cljs :refer [str-contains?]]))

(keys @(pool/last-active))


(do (def ed (pool/last-active)) (def loc (:loc (ed->info ed))) nil)

(:loc (ed->info ed))

(paredit/form-boundary
 (:ed (paredit/ed->info (pool/last-active)))
 (:loc (paredit/ed->info (pool/last-active)))
 (when nil
   (re-pattern (str "[\\" type "]"))))

(:loc (ed->info ed))
(:ed (ed->info ed))

(cmd/command {:command :form-boundary
              :desc "Form boundary (test)"
              :exec (fn []
                      (prn (form-boundary
                           (:ed (ed->info (pool/last-active)))
                           (:loc (ed->info (pool/last-active)))
                           (when nil
                             (re-pattern (str "[\\" type "]"))))))})


(cmd/command {:command :set-cursor
              :desc "Set cursor"
              :exec (fn []
                      (prn (paired-scan
                           {:dir :left
                            :ed ed
                            :loc (move-loc ed (:loc (ed->info ed)) :left)
                            :for form-start})))})


(cmd/command {:command :paredit.select.parent
              :desc "Paredit: Select expression2"
              :exec (fn [type]
                      (prn type)
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (select type)
                            (batched-edits)
                            ))
                      )})
(paired-scan {:dir :left
              :ed ed
              :loc (move-loc ed loc :left)
              :for form-start})

(paired-scan {:dir :left
              :ed (pool/last-active)
              :loc (move-loc (pool/last-active) (:loc (ed->info (pool/last-active))) :left)
              :for (or regex form-start)})

(editor/->cursor ed)
(editor/get-char ed -1)
(editor/adjust-loc (editor/->cursor ed) 0)

(scan {:dir :left
       :ed ed
       :loc (:loc (ed->info ed))
       :regex #""})

(let [matching {"(" ")>" ")" "(<" "[" "]>" "]" "[<" "{" "}>" "}" "{<"}]
  (defn find-matching-bracket []
    (let [max-scan-len 10000
          ed (pool/last-active)
          cur (-> ed ed->info :loc)
          line (:line cur)
          pos (- (:ch cur) 1)
          match (and (>= pos 0)
                     (get matching (editor/get-char ed -1)))
          forward (when (not (nil? match))
                    (= (.charAt match 1) ">"))
          d (if forward 1 -1)
          style (.getTokenTypeAt (:ed @ed) (js/CodeMirror.Pos. line (:ch cur)))])))

(find-matching-bracket)

(editor/->token-js (editor/->cursor (pool/last-active)))
(.log js/console (:ed @(pool/last-active)))
(object/by-tag :editor)

(def cur (-> (pool/last-active) ed->info :loc))
(.getTokenTypeAt (:ed @(pool/last-active)) (js/CodeMirror.Pos. (:line cur) (- (:ch cur) 2)))

(js/ewen.lt.findMatchingBracket (:ed @(pool/last-active)) (-> @(pool/last-active) :ed (.getCursor)) true)


(defn matching-brackets-pos [match]
  [{:line (-> match (.-from) (.-line)) :ch (-> match (.-from) (.-ch))}
   {:line (-> match (.-to) (.-line)) :ch (-> match (.-to) (.-ch))}])

(defn select-matching-brackets [{:keys [ed loc] :as orig} forward]
  (let [matching-brackets (js/ewen.lt.findMatchingBracket (:ed @ed) (.getCursor (:ed @ed)) true)]
    (if (and (not (nil? matching-brackets))
             (= forward (.-forward matching-brackets)))
      (let [[start end] (matching-brackets-pos matching-brackets)
            [start end] (if forward
                          [start (editor/adjust-loc end 1)]
                          [(editor/adjust-loc start 1) end])]
        (update-in orig [:edits] conj
                   {:type :cursor
                    :from start
                    :to end}))
    orig)))


(defn select-at-point [ed]
  (let [[at-point after] [(editor/get-char ed 0) (editor/get-char ed 1)]]
    (match [at-point after]
           [")" _] 1
           :else [at-point after])
    #_(select-matching-brackets ed false)))

  (select-at-point (pool/last-active))


(cmd/command {:command :ewen.paredit.select.at-point
              :desc "Ewen-Paredit: Select at point"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (paredit/ed->info ed)
                            select-at-point
                            (paredit/batched-edits))))})

(defn scan [{:keys [dir ed loc regex match-length] :as opts}]
  (let [search-range [(- (:line loc) 100) (+ (:line loc) 100)]
        match-length (if (nil? match-length) 1 match-length)]
    (loop [cur loc
           line (editor/line ed (:line loc))
           buff (ring-buffer match-length)]
      (if (or (not cur)
              (not line)
              (not (paredit/within-range search-range cur)))
        nil
        (let [ch (get line (:ch cur))
              buff (conj buff ch)
              buff-str (->> buff reverse (reduce str))
              next-loc (paredit/move-loc ed cur dir)
              next-line (if (not= (:line cur) (:line next-loc))
                          (editor/line ed (:line next-loc))
                          line)]
          (if (and buff-str (re-seq regex buff-str))
            [buff-str cur]
            (recur next-loc next-line buff)))))))

  (reduce str (-> (ring-buffer 3) (conj 1) (conj 2) (conj 3) (conj 4)))
  (reverse (-> (ring-buffer 3) (conj 1) (conj 2) (conj 3)))



(defn first-whitespace [opts]
  (paredit/scan (assoc opts :regex #" ")))

(defn first-ignore [opts]
  (paredit/scan (assoc opts :regex #"#_")))

(first-whitespace {:ed (pool/last-active)
                           :loc (:loc (paredit/ed->info (pool/last-active)))
                           :dir :left})

(scan {:ed (pool/last-active)
       :loc (:loc (paredit/ed->info (pool/last-active)))
       :dir :left
       :regex #"#_"
       :match-length 2})


(:ed @(pool/last-active))
(:ed @(:ed (paredit/ed->info (pool/last-active))))



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


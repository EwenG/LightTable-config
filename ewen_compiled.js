if(!lt.util.load.provided_QMARK_('cljs.core.match')) {
goog.provide('cljs.core.match');
goog.require('cljs.core');

cljs.core.match.backtrack = (new Error());

}
if(!lt.util.load.provided_QMARK_('amalloy.ring-buffer')) {
goog.provide('amalloy.ring_buffer');
goog.require('cljs.core');

amalloy.ring_buffer.old_unchecked_math = amalloy.ring_buffer._STAR_unchecked_math_STAR_;

amalloy.ring_buffer._STAR_unchecked_math_STAR_ = true;


/**
* @constructor
*/
amalloy.ring_buffer.RingBuffer = (function (start,len,buf,meta){
this.start = start;
this.len = len;
this.buf = buf;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2175148046;
})
amalloy.ring_buffer.RingBuffer.cljs$lang$type = true;
amalloy.ring_buffer.RingBuffer.cljs$lang$ctorStr = "amalloy.ring-buffer/RingBuffer";
amalloy.ring_buffer.RingBuffer.cljs$lang$ctorPrWriter = (function (this__6364__auto__,writer__6365__auto__,opt__6366__auto__){return cljs.core._write.call(null,writer__6365__auto__,"amalloy.ring-buffer/RingBuffer");
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (b,w,opts){var self__ = this;
var b__$1 = this;cljs.core._write.call(null,w,"(");
var b_8673__$2 = cljs.core.seq.call(null,b__$1);while(true){
var temp__4092__auto___8674 = b_8673__$2;if(temp__4092__auto___8674)
{var vec__8623_8675 = temp__4092__auto___8674;var x_8676 = cljs.core.nth.call(null,vec__8623_8675,0,null);var xs_8677 = cljs.core.nthnext.call(null,vec__8623_8675,1);cljs.core._write.call(null,w,x_8676);
if(xs_8677)
{cljs.core._write.call(null,w," ");
{
var G__8678 = xs_8677;
b_8673__$2 = G__8678;
continue;
}
} else
{}
} else
{}
break;
}
return cljs.core._write.call(null,w,")");
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,x){var self__ = this;
var this$__$1 = this;if(cljs.core._EQ_.call(null,self__.len,cljs.core.count.call(null,self__.buf)))
{return (new amalloy.ring_buffer.RingBuffer(cljs.core.rem.call(null,(self__.start + 1),self__.len),self__.len,cljs.core.assoc.call(null,self__.buf,self__.start,x),self__.meta));
} else
{return (new amalloy.ring_buffer.RingBuffer(self__.start,(self__.len + 1),cljs.core.assoc.call(null,self__.buf,cljs.core.rem.call(null,(self__.start + self__.len),cljs.core.count.call(null,self__.buf)),x),self__.meta));
}
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return cljs.core.seq.call(null,(function (){var iter__6513__auto__ = (function iter__8624(s__8625){return (new cljs.core.LazySeq(null,(function (){var s__8625__$1 = s__8625;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__8625__$1);if(temp__4092__auto__)
{var s__8625__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8625__$2))
{var c__6511__auto__ = cljs.core.chunk_first.call(null,s__8625__$2);var size__6512__auto__ = cljs.core.count.call(null,c__6511__auto__);var b__8627 = cljs.core.chunk_buffer.call(null,size__6512__auto__);if((function (){var i__8626 = 0;while(true){
if((i__8626 < size__6512__auto__))
{var i = cljs.core._nth.call(null,c__6511__auto__,i__8626);cljs.core.chunk_append.call(null,b__8627,cljs.core.nth.call(null,self__.buf,cljs.core.rem.call(null,(self__.start + i),cljs.core.count.call(null,self__.buf))));
{
var G__8679 = (i__8626 + 1);
i__8626 = G__8679;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8627),iter__8624.call(null,cljs.core.chunk_rest.call(null,s__8625__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8627),null);
}
} else
{var i = cljs.core.first.call(null,s__8625__$2);return cljs.core.cons.call(null,cljs.core.nth.call(null,self__.buf,cljs.core.rem.call(null,(self__.start + i),cljs.core.count.call(null,self__.buf))),iter__8624.call(null,cljs.core.rest.call(null,s__8625__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__6513__auto__.call(null,cljs.core.range.call(null,self__.len));
})());
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return self__.len;
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IStack$_peek$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return cljs.core.nth.call(null,self__.buf,cljs.core.rem.call(null,self__.start,cljs.core.count.call(null,self__.buf)));
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IStack$_pop$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;if((self__.len === 0))
{throw (new Error("Can't pop empty queue"));
} else
{return (new amalloy.ring_buffer.RingBuffer(cljs.core.rem.call(null,(self__.start + 1),cljs.core.count.call(null,self__.buf)),(self__.len - 1),cljs.core.assoc.call(null,self__.buf,self__.start,null),self__.meta));
}
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){var self__ = this;
var this$__$1 = this;return (cljs.core.sequential_QMARK_.call(null,other)) && ((!(cljs.core.counted_QMARK_.call(null,other))) || (cljs.core._EQ_.call(null,cljs.core.count.call(null,this$__$1),cljs.core.count.call(null,other)))) && (cljs.core._EQ_.call(null,cljs.core.seq.call(null,this$__$1),cljs.core.seq.call(null,other)));
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,m){var self__ = this;
var this$__$1 = this;return (new amalloy.ring_buffer.RingBuffer(self__.start,self__.len,self__.buf,m));
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return self__.meta;
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return (new amalloy.ring_buffer.RingBuffer(0,0,cljs.core.vec.call(null,cljs.core.repeat.call(null,cljs.core.count.call(null,self__.buf),null)),self__.meta));
});
amalloy.ring_buffer.__GT_RingBuffer = (function __GT_RingBuffer(start,len,buf,meta){return (new amalloy.ring_buffer.RingBuffer(start,len,buf,meta));
});

/**
* Create an empty ring buffer with the specified [capacity].
*/
amalloy.ring_buffer.ring_buffer = (function ring_buffer(capacity){return (new amalloy.ring_buffer.RingBuffer(0,0,cljs.core.vec.call(null,cljs.core.repeat.call(null,capacity,null)),null));
});

amalloy.ring_buffer._STAR_unchecked_math_STAR_ = amalloy.ring_buffer.old_unchecked_math;

}
if(!lt.util.load.provided_QMARK_('ewen')) {
goog.provide('ewen');
goog.require('cljs.core');
goog.require('amalloy.ring_buffer');
goog.require('lt.object');
goog.require('lt.objs.files');
goog.require('lt.plugins.paredit');
goog.require('lt.objs.context');
goog.require('lt.objs.tabs');
goog.require('lt.plugins.paredit');
goog.require('amalloy.ring_buffer');
goog.require('lt.objs.context');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('cljs.core.match');
goog.require('lt.objs.editor');
goog.require('cljs.core.match');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.tabs');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');

ewen.paired_scan = (function paired_scan(p__8858){var map__8861 = p__8858;var map__8861__$1 = ((cljs.core.seq_QMARK_.call(null,map__8861))?cljs.core.apply.call(null,cljs.core.hash_map,map__8861):map__8861);var opts = map__8861__$1;var for_length = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"for-length","for-length",673892316));var only_for_QMARK_ = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697));var allow_strings_QMARK_ = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235));var allow_end_QMARK_ = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170));var negation = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"negation","negation",1935015639));var for$ = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"for","for",1014005819));var loc = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__8861__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var vec__8862 = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_end,lt.plugins.paredit.form_start], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_start,lt.plugins.paredit.form_end], null));var stack_chars = cljs.core.nth.call(null,vec__8862,0,null);var stack_ends = cljs.core.nth.call(null,vec__8862,1,null);var final_loc = lt.plugins.paredit.end_loc.call(null,ed);var search_range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) + 100)], null);var for_length__$1 = (cljs.core.truth_(for_length)?for_length:1);var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var stack = cljs.core.PersistentVector.EMPTY;var ch_stack = amalloy.ring_buffer.ring_buffer.call(null,for_length__$1);while(true){
if((cljs.core.not.call(null,cur)) || (cljs.core.not.call(null,line)) || (cljs.core.not.call(null,lt.plugins.paredit.within_range.call(null,search_range,cur))))
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur));var ch_stack__$1 = cljs.core.conj.call(null,ch_stack,ch);var ch_str = cljs.core.reduce.call(null,cljs.core.str,ch_stack__$1);var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)):line);var valid_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur,allow_strings_QMARK_));var stackable_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur));if(cljs.core.truth_((function (){var and__5790__auto__ = allow_end_QMARK_;if(cljs.core.truth_(and__5790__auto__))
{return (valid_QMARK_) && ((cljs.core._EQ_.call(null,final_loc,cur)) || (cljs.core.not_EQ_.call(null,next_line,line)));
} else
{return and__5790__auto__;
}
})()))
{if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,lt.objs.editor.adjust_loc.call(null,cur,1)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"ch","ch",1013907415),-1], null)], null);
}
} else
{if(cljs.core.truth_((function (){var and__5790__auto__ = ch;if(cljs.core.truth_(and__5790__auto__))
{var and__5790__auto____$1 = cljs.core.re_seq.call(null,for$,ch_str);if(cljs.core.truth_(and__5790__auto____$1))
{var and__5790__auto____$2 = valid_QMARK_;if(and__5790__auto____$2)
{var and__5790__auto____$3 = cljs.core.not.call(null,cljs.core.seq.call(null,stack));if(and__5790__auto____$3)
{if(cljs.core.truth_(negation))
{return negation.call(null,line,cur);
} else
{return true;
}
} else
{return and__5790__auto____$3;
}
} else
{return and__5790__auto____$2;
}
} else
{return and__5790__auto____$1;
}
} else
{return and__5790__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,cur], null);
} else
{if(cljs.core.truth_((function (){var and__5790__auto__ = ch;if(cljs.core.truth_(and__5790__auto__))
{var and__5790__auto____$1 = cljs.core.not.call(null,only_for_QMARK_);if(and__5790__auto____$1)
{var and__5790__auto____$2 = lt.plugins.paredit.stackable_QMARK_;if(cljs.core.truth_(and__5790__auto____$2))
{var and__5790__auto____$3 = cljs.core.re_seq.call(null,stack_ends,ch_str);if(cljs.core.truth_(and__5790__auto____$3))
{return cljs.core.not_EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack)));
} else
{return and__5790__auto____$3;
}
} else
{return and__5790__auto____$2;
}
} else
{return and__5790__auto____$1;
}
} else
{return and__5790__auto__;
}
})()))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__9114 = next_loc;
var G__9115 = next_line;
var G__9116 = (cljs.core.truth_((function (){var and__5790__auto__ = ch;if(cljs.core.truth_(and__5790__auto__))
{var and__5790__auto____$1 = lt.plugins.paredit.stackable_QMARK_;if(cljs.core.truth_(and__5790__auto____$1))
{return cljs.core.re_seq.call(null,stack_chars,ch);
} else
{return and__5790__auto____$1;
}
} else
{return and__5790__auto__;
}
})())?cljs.core.conj.call(null,stack,ch):(cljs.core.truth_((function (){var and__5790__auto__ = ch;if(cljs.core.truth_(and__5790__auto__))
{var and__5790__auto____$1 = lt.plugins.paredit.stackable_QMARK_;if(cljs.core.truth_(and__5790__auto____$1))
{return cljs.core._EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack)));
} else
{return and__5790__auto____$1;
}
} else
{return and__5790__auto__;
}
})())?cljs.core.pop.call(null,stack):((new cljs.core.Keyword(null,"else","else",1017020587))?stack:null)));
var G__9117 = ch_stack__$1;
cur = G__9114;
line = G__9115;
stack = G__9116;
ch_stack = G__9117;
continue;
}
} else
{return null;
}
}
}
}
}
break;
}
});

ewen.select_parent = (function select_parent(ed){if(cljs.core.truth_(ed))
{if(cljs.core.truth_((function (){var or__5802__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("ewen","orig-pos","ewen/orig-pos",2594166885).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__5802__auto__)
{return or__5802__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("ewen","orig-pos","ewen/orig-pos",2594166885),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.select.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),null));
} else
{return null;
}
});

ewen.move_loc = (function move_loc(ed,dir){return lt.plugins.paredit.move_loc.call(null,ed,new cljs.core.Keyword(null,"loc","loc",1014011570).cljs$core$IFn$_invoke$arity$1(lt.plugins.paredit.ed__GT_info.call(null,ed)),dir);
});

ewen.select = (function select(p__8863,p__8864){var map__8867 = p__8863;var map__8867__$1 = ((cljs.core.seq_QMARK_.call(null,map__8867))?cljs.core.apply.call(null,cljs.core.hash_map,map__8867):map__8867);var orig = map__8867__$1;var loc = cljs.core.get.call(null,map__8867__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8867__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__8868 = p__8864;var start = cljs.core.nth.call(null,vec__8868,0,null);var end = cljs.core.nth.call(null,vec__8868,1,null);return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], null));
});

ewen.get_char = (function() {
var get_char = null;
var get_char__2 = (function (ed,loc){return lt.objs.editor.range.call(null,ed,lt.objs.editor.adjust_loc.call(null,loc,-1),loc);
});
var get_char__3 = (function (ed,loc,dir){if((dir > 0))
{return lt.objs.editor.range.call(null,ed,loc,lt.objs.editor.adjust_loc.call(null,loc,dir));
} else
{return lt.objs.editor.range.call(null,ed,lt.objs.editor.adjust_loc.call(null,loc,dir),loc);
}
});
get_char = function(ed,loc,dir){
switch(arguments.length){
case 2:
return get_char__2.call(this,ed,loc);
case 3:
return get_char__3.call(this,ed,loc,dir);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_char.cljs$core$IFn$_invoke$arity$2 = get_char__2;
get_char.cljs$core$IFn$_invoke$arity$3 = get_char__3;
return get_char;
})()
;

ewen.word_boundary = (function word_boundary(ed,loc){var vec__8871 = ewen.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170),false,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)),new cljs.core.Keyword(null,"for","for",1014005819),/[\s\)\}\]\"\(\{\[(#_)]/,new cljs.core.Keyword(null,"for-length","for-length",673892316),2], null));var c = cljs.core.nth.call(null,vec__8871,0,null);var start = cljs.core.nth.call(null,vec__8871,1,null);var start__$1 = (cljs.core.truth_(start)?lt.plugins.paredit.move_loc.call(null,ed,start,new cljs.core.Keyword(null,"right","right",1122416014)):null);var vec__8872 = ((cljs.core.not.call(null,c))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null):ewen.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170),false,new cljs.core.Keyword(null,"loc","loc",1014011570),start__$1,new cljs.core.Keyword(null,"for","for",1014005819),/[\s\)\}\]\"\(\{\[]/], null)));var c__$1 = cljs.core.nth.call(null,vec__8872,0,null);var end = cljs.core.nth.call(null,vec__8872,1,null);var end__$1 = (cljs.core.truth_(end)?lt.plugins.paredit.move_loc.call(null,ed,end,new cljs.core.Keyword(null,"left","left",1017222009)):null);var end__$2 = (cljs.core.truth_((function (){var and__5790__auto__ = end__$1;if(cljs.core.truth_(and__5790__auto__))
{return (new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(end__$1) > new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(start__$1));
} else
{return and__5790__auto__;
}
})())?lt.plugins.paredit.move_loc.call(null,ed,end__$1,new cljs.core.Keyword(null,"left","left",1017222009)):end__$1);if(cljs.core.truth_((function (){var and__5790__auto__ = start__$1;if(cljs.core.truth_(and__5790__auto__))
{return end__$2;
} else
{return and__5790__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start__$1,end__$2], null);
} else
{return null;
}
});

ewen.select_at_point = (function select_at_point(ed){var vec__8888 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.get_char.call(null,ed,-1),lt.objs.editor.get_char.call(null,ed,1)], null);var at_point = cljs.core.nth.call(null,vec__8888,0,null);var after = cljs.core.nth.call(null,vec__8888,1,null);var loc = new cljs.core.Keyword(null,"loc","loc",1014011570).cljs$core$IFn$_invoke$arity$1(lt.plugins.paredit.ed__GT_info.call(null,ed));var left_loc = ewen.move_loc.call(null,ed,new cljs.core.Keyword(null,"left","left",1017222009));var ed_info = lt.plugins.paredit.ed__GT_info.call(null,ed);var boundaries = (function (){try{if((at_point === ")"))
{return lt.plugins.paredit.form_boundary.call(null,ed,left_loc,null);
} else
{if((at_point === "]"))
{return lt.plugins.paredit.form_boundary.call(null,ed,left_loc,null);
} else
{if((at_point === "}"))
{return lt.plugins.paredit.form_boundary.call(null,ed,left_loc,null);
} else
{if((at_point === ""))
{return null;
} else
{if((at_point === " "))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}
}
}
}catch (e8901){if((e8901 instanceof Error))
{var e__7617__auto__ = e8901;if((e__7617__auto__ === cljs.core.match.backtrack))
{try{if((after === ""))
{return ewen.word_boundary.call(null,ed,left_loc);
} else
{if((after === " "))
{return ewen.word_boundary.call(null,ed,left_loc);
} else
{if((after === ")"))
{return ewen.word_boundary.call(null,ed,left_loc);
} else
{if((after === "]"))
{return ewen.word_boundary.call(null,ed,left_loc);
} else
{if((after === "}"))
{return ewen.word_boundary.call(null,ed,left_loc);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}
}
}
}catch (e8902){if((e8902 instanceof Error))
{var e__7617__auto____$1 = e8902;if((e__7617__auto____$1 === cljs.core.match.backtrack))
{return null;
} else
{throw e__7617__auto____$1;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e8902;
} else
{return null;
}
}
}} else
{throw e__7617__auto__;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e8901;
} else
{return null;
}
}
}})();var selection = (cljs.core.truth_(cljs.core.first.call(null,boundaries))?ewen.select.call(null,ed_info,boundaries):ed_info);if(cljs.core.truth_(selection))
{return lt.plugins.paredit.batched_edits.call(null,selection);
} else
{return null;
}
});

ewen.normalize_boundary = (function normalize_boundary(p__8903){var map__8905 = p__8903;var map__8905__$1 = ((cljs.core.seq_QMARK_.call(null,map__8905))?cljs.core.apply.call(null,cljs.core.hash_map,map__8905):map__8905);var to = cljs.core.get.call(null,map__8905__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__8905__$1,new cljs.core.Keyword(null,"from","from",1017056028));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [from,to], null);
});

ewen.min_loc = (function min_loc(p__8906,p__8907){var map__8910 = p__8906;var map__8910__$1 = ((cljs.core.seq_QMARK_.call(null,map__8910))?cljs.core.apply.call(null,cljs.core.hash_map,map__8910):map__8910);var loc1 = map__8910__$1;var l1 = cljs.core.get.call(null,map__8910__$1,new cljs.core.Keyword(null,"line","line",1017226086));var ch1 = cljs.core.get.call(null,map__8910__$1,new cljs.core.Keyword(null,"ch","ch",1013907415));var map__8911 = p__8907;var map__8911__$1 = ((cljs.core.seq_QMARK_.call(null,map__8911))?cljs.core.apply.call(null,cljs.core.hash_map,map__8911):map__8911);var loc2 = map__8911__$1;var l2 = cljs.core.get.call(null,map__8911__$1,new cljs.core.Keyword(null,"line","line",1017226086));var ch2 = cljs.core.get.call(null,map__8911__$1,new cljs.core.Keyword(null,"ch","ch",1013907415));if((loc1 == null))
{return loc2;
} else
{if((loc2 == null))
{return loc1;
} else
{if((l1 < l2))
{return loc1;
} else
{if((l2 < l1))
{return loc2;
} else
{if((ch1 < ch2))
{return loc1;
} else
{if((ch2 <= ch1))
{return loc2;
} else
{return null;
}
}
}
}
}
}
});

ewen.max_loc = (function max_loc(p__8912,p__8913){var map__8916 = p__8912;var map__8916__$1 = ((cljs.core.seq_QMARK_.call(null,map__8916))?cljs.core.apply.call(null,cljs.core.hash_map,map__8916):map__8916);var loc1 = map__8916__$1;var l1 = cljs.core.get.call(null,map__8916__$1,new cljs.core.Keyword(null,"line","line",1017226086));var ch1 = cljs.core.get.call(null,map__8916__$1,new cljs.core.Keyword(null,"ch","ch",1013907415));var map__8917 = p__8913;var map__8917__$1 = ((cljs.core.seq_QMARK_.call(null,map__8917))?cljs.core.apply.call(null,cljs.core.hash_map,map__8917):map__8917);var loc2 = map__8917__$1;var l2 = cljs.core.get.call(null,map__8917__$1,new cljs.core.Keyword(null,"line","line",1017226086));var ch2 = cljs.core.get.call(null,map__8917__$1,new cljs.core.Keyword(null,"ch","ch",1013907415));if((loc1 == null))
{return loc2;
} else
{if((loc2 == null))
{return loc1;
} else
{if((l1 < l2))
{return loc2;
} else
{if((l2 < l1))
{return loc1;
} else
{if((ch1 < ch2))
{return loc2;
} else
{if((ch2 <= ch1))
{return loc1;
} else
{return null;
}
}
}
}
}
}
});

/**
* @param {...*} var_args
*/
ewen.merge_boundaries = (function() {
var merge_boundaries = null;
var merge_boundaries__2 = (function (p__8918,p__8919){var vec__8923 = p__8918;var start1 = cljs.core.nth.call(null,vec__8923,0,null);var end1 = cljs.core.nth.call(null,vec__8923,1,null);var vec__8924 = p__8919;var start2 = cljs.core.nth.call(null,vec__8924,0,null);var end2 = cljs.core.nth.call(null,vec__8924,1,null);var vec__8925 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ewen.min_loc.call(null,start1,start2),ewen.max_loc.call(null,end1,end2)], null);var start = cljs.core.nth.call(null,vec__8925,0,null);var end = cljs.core.nth.call(null,vec__8925,1,null);if(cljs.core.truth_((function (){var and__5790__auto__ = start;if(cljs.core.truth_(and__5790__auto__))
{return end;
} else
{return and__5790__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,end], null);
} else
{return null;
}
});
var merge_boundaries__3 = (function() { 
var G__9118__delegate = function (b1,b2,boundaries){return cljs.core.reduce.call(null,merge_boundaries,merge_boundaries.call(null,b1,b2),boundaries);
};
var G__9118 = function (b1,b2,var_args){
var boundaries = null;if (arguments.length > 2) {
  boundaries = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__9118__delegate.call(this,b1,b2,boundaries);};
G__9118.cljs$lang$maxFixedArity = 2;
G__9118.cljs$lang$applyTo = (function (arglist__9119){
var b1 = cljs.core.first(arglist__9119);
arglist__9119 = cljs.core.next(arglist__9119);
var b2 = cljs.core.first(arglist__9119);
var boundaries = cljs.core.rest(arglist__9119);
return G__9118__delegate(b1,b2,boundaries);
});
G__9118.cljs$core$IFn$_invoke$arity$variadic = G__9118__delegate;
return G__9118;
})()
;
merge_boundaries = function(b1,b2,var_args){
var boundaries = var_args;
switch(arguments.length){
case 2:
return merge_boundaries__2.call(this,b1,b2);
default:
return merge_boundaries__3.cljs$core$IFn$_invoke$arity$variadic(b1,b2, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge_boundaries.cljs$lang$maxFixedArity = 2;
merge_boundaries.cljs$lang$applyTo = merge_boundaries__3.cljs$lang$applyTo;
merge_boundaries.cljs$core$IFn$_invoke$arity$2 = merge_boundaries__2;
merge_boundaries.cljs$core$IFn$_invoke$arity$variadic = merge_boundaries__3.cljs$core$IFn$_invoke$arity$variadic;
return merge_boundaries;
})()
;

ewen.select_next = (function select_next(ed){var loc = lt.objs.editor.__GT_cursor.call(null,ed);var ed_info = lt.plugins.paredit.ed__GT_info.call(null,ed);var select_boundaries = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,ed))?ewen.normalize_boundary.call(null,lt.objs.editor.selection_bounds.call(null,ed)):null);var whitespaces_boundaries = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,cljs.core.second.call(null,lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),loc,new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"right","right",1122416014)], null)))], null);var right_loc = lt.objs.editor.adjust_loc.call(null,cljs.core.second.call(null,whitespaces_boundaries),1);var vec__8973 = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),-2),ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),-1),ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),1),ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),2)], null);var bbefore = cljs.core.nth.call(null,vec__8973,0,null);var before = cljs.core.nth.call(null,vec__8973,1,null);var after = cljs.core.nth.call(null,vec__8973,2,null);var aafter = cljs.core.nth.call(null,vec__8973,3,null);var boundaries = (function (){try{if((after === "("))
{return lt.plugins.paredit.form_boundary.call(null,ed,right_loc,null);
} else
{if((after === "["))
{return lt.plugins.paredit.form_boundary.call(null,ed,right_loc,null);
} else
{if((after === "{"))
{return lt.plugins.paredit.form_boundary.call(null,ed,right_loc,null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}
}catch (e9014){if((e9014 instanceof Error))
{var e__7617__auto__ = e9014;if((e__7617__auto__ === cljs.core.match.backtrack))
{try{if((aafter === "#_"))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.second.call(null,whitespaces_boundaries),right_loc], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}catch (e9015){if((e9015 instanceof Error))
{var e__7617__auto____$1 = e9015;if((e__7617__auto____$1 === cljs.core.match.backtrack))
{try{if((after === ""))
{return null;
} else
{if((after === " "))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}catch (e9016){if((e9016 instanceof Error))
{var e__7617__auto____$2 = e9016;if((e__7617__auto____$2 === cljs.core.match.backtrack))
{try{if((before === "("))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if((before === "["))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if((before === "{"))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}
}catch (e9017){if((e9017 instanceof Error))
{var e__7617__auto____$3 = e9017;if((e__7617__auto____$3 === cljs.core.match.backtrack))
{try{if((bbefore === "#_"))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}catch (e9018){if((e9018 instanceof Error))
{var e__7617__auto____$4 = e9018;if((e__7617__auto____$4 === cljs.core.match.backtrack))
{try{if((before === ""))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if((before === " "))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}catch (e9019){if((e9019 instanceof Error))
{var e__7617__auto____$5 = e9019;if((e__7617__auto____$5 === cljs.core.match.backtrack))
{return null;
} else
{throw e__7617__auto____$5;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9019;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$4;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9018;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$3;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9017;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$2;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9016;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$1;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9015;
} else
{return null;
}
}
}} else
{throw e__7617__auto__;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9014;
} else
{return null;
}
}
}})();var merged_boundaries = ewen.merge_boundaries.call(null,select_boundaries,whitespaces_boundaries,boundaries);var selection = (cljs.core.truth_(merged_boundaries)?ewen.select.call(null,ed_info,merged_boundaries):ed_info);if(cljs.core.truth_(selection))
{return lt.plugins.paredit.batched_edits.call(null,selection);
} else
{return null;
}
});

ewen.move_forward = (function move_forward(ed){var loc = lt.objs.editor.__GT_cursor.call(null,ed);var ed_info = lt.plugins.paredit.ed__GT_info.call(null,ed);var whitespaces_boundaries = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,cljs.core.second.call(null,lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),loc,new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"right","right",1122416014)], null)))], null);var right_loc = lt.objs.editor.adjust_loc.call(null,cljs.core.second.call(null,whitespaces_boundaries),1);var vec__9067 = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),-2),ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),-1),ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),1),ewen.get_char.call(null,ed,cljs.core.second.call(null,whitespaces_boundaries),2)], null);var bbefore = cljs.core.nth.call(null,vec__9067,0,null);var before = cljs.core.nth.call(null,vec__9067,1,null);var after = cljs.core.nth.call(null,vec__9067,2,null);var aafter = cljs.core.nth.call(null,vec__9067,3,null);var boundaries = (function (){try{if((after === "("))
{return lt.plugins.paredit.form_boundary.call(null,ed,right_loc,null);
} else
{if((after === "["))
{return lt.plugins.paredit.form_boundary.call(null,ed,right_loc,null);
} else
{if((after === "{"))
{return lt.plugins.paredit.form_boundary.call(null,ed,right_loc,null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}
}catch (e9108){if((e9108 instanceof Error))
{var e__7617__auto__ = e9108;if((e__7617__auto__ === cljs.core.match.backtrack))
{try{if((aafter === "#_"))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.second.call(null,whitespaces_boundaries),right_loc], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}catch (e9109){if((e9109 instanceof Error))
{var e__7617__auto____$1 = e9109;if((e__7617__auto____$1 === cljs.core.match.backtrack))
{try{if((after === ""))
{return null;
} else
{if((after === " "))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}catch (e9110){if((e9110 instanceof Error))
{var e__7617__auto____$2 = e9110;if((e__7617__auto____$2 === cljs.core.match.backtrack))
{try{if((before === "("))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if((before === "["))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if((before === "{"))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}
}catch (e9111){if((e9111 instanceof Error))
{var e__7617__auto____$3 = e9111;if((e__7617__auto____$3 === cljs.core.match.backtrack))
{try{if((bbefore === "#_"))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}catch (e9112){if((e9112 instanceof Error))
{var e__7617__auto____$4 = e9112;if((e__7617__auto____$4 === cljs.core.match.backtrack))
{try{if((before === ""))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if((before === " "))
{return ewen.word_boundary.call(null,ed,right_loc);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw cljs.core.match.backtrack;
} else
{return null;
}
}
}
}catch (e9113){if((e9113 instanceof Error))
{var e__7617__auto____$5 = e9113;if((e__7617__auto____$5 === cljs.core.match.backtrack))
{return null;
} else
{throw e__7617__auto____$5;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9113;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$4;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9112;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$3;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9111;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$2;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9110;
} else
{return null;
}
}
}} else
{throw e__7617__auto____$1;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9109;
} else
{return null;
}
}
}} else
{throw e__7617__auto__;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9108;
} else
{return null;
}
}
}})();var merged_boundaries = ewen.merge_boundaries.call(null,whitespaces_boundaries,boundaries);var selection = (cljs.core.truth_(merged_boundaries)?ewen.select.call(null,ed_info,merged_boundaries):ed_info);if(cljs.core.truth_(selection))
{return lt.plugins.paredit.batched_edits.call(null,selection);
} else
{return null;
}
});

ewen.eval_at_point = (function eval_at_point(ed){if(cljs.core.truth_((function (){var or__5802__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("ewen","orig-pos","ewen/orig-pos",2594166885).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__5802__auto__)
{return or__5802__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("ewen","orig-pos","ewen/orig-pos",2594166885),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
if(cljs.core.not.call(null,lt.objs.editor.selection_QMARK_.call(null,ed)))
{ewen.select_at_point.call(null,ed);
} else
{}
if(cljs.core.truth_(ed))
{lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"eval.one","eval.one",1173589382));
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.selection.clear","editor.selection.clear",1854878812));
} else
{}
if(cljs.core.truth_(new cljs.core.Keyword("ewen","orig-pos","ewen/orig-pos",2594166885).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))))
{lt.objs.editor.move_cursor.call(null,ed,new cljs.core.Keyword("ewen","orig-pos","ewen/orig-pos",2594166885).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
return lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("ewen","orig-pos","ewen/orig-pos",2594166885),null], null));
} else
{return null;
}
});

lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"ewen.select-at-point","ewen.select-at-point",4701347206),new cljs.core.Keyword(null,"desc","desc",1016984067),"select at point",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return ewen.select_at_point.call(null,lt.objs.editor.pool.last_active.call(null));
})], null));

lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"ewen.select-next","ewen.select-next",4375127043),new cljs.core.Keyword(null,"desc","desc",1016984067),"select next",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return ewen.select_next.call(null,lt.objs.editor.pool.last_active.call(null));
})], null));

lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"ewen.eval-at-point","ewen.eval-at-point",1353567526),new cljs.core.Keyword(null,"desc","desc",1016984067),"eval at point",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return ewen.eval_at_point.call(null,lt.objs.editor.pool.last_active.call(null));
})], null));


}

//# sourceMappingURL=
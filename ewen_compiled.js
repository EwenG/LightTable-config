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
amalloy.ring_buffer.RingBuffer.cljs$lang$ctorPrWriter = (function (this__7306__auto__,writer__7307__auto__,opt__7308__auto__){return cljs.core._write.call(null,writer__7307__auto__,"amalloy.ring-buffer/RingBuffer");
});
amalloy.ring_buffer.RingBuffer.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (b,w,opts){var self__ = this;
var b__$1 = this;cljs.core._write.call(null,w,"(");
var b_8249__$2 = cljs.core.seq.call(null,b__$1);while(true){
var temp__4092__auto___8250 = b_8249__$2;if(temp__4092__auto___8250)
{var vec__8199_8251 = temp__4092__auto___8250;var x_8252 = cljs.core.nth.call(null,vec__8199_8251,0,null);var xs_8253 = cljs.core.nthnext.call(null,vec__8199_8251,1);cljs.core._write.call(null,w,x_8252);
if(xs_8253)
{cljs.core._write.call(null,w," ");
{
var G__8254 = xs_8253;
b_8249__$2 = G__8254;
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
var this$__$1 = this;return cljs.core.seq.call(null,(function (){var iter__7455__auto__ = (function iter__8200(s__8201){return (new cljs.core.LazySeq(null,(function (){var s__8201__$1 = s__8201;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__8201__$1);if(temp__4092__auto__)
{var s__8201__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8201__$2))
{var c__7453__auto__ = cljs.core.chunk_first.call(null,s__8201__$2);var size__7454__auto__ = cljs.core.count.call(null,c__7453__auto__);var b__8203 = cljs.core.chunk_buffer.call(null,size__7454__auto__);if((function (){var i__8202 = 0;while(true){
if((i__8202 < size__7454__auto__))
{var i = cljs.core._nth.call(null,c__7453__auto__,i__8202);cljs.core.chunk_append.call(null,b__8203,cljs.core.nth.call(null,self__.buf,cljs.core.rem.call(null,(self__.start + i),cljs.core.count.call(null,self__.buf))));
{
var G__8255 = (i__8202 + 1);
i__8202 = G__8255;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8203),iter__8200.call(null,cljs.core.chunk_rest.call(null,s__8201__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8203),null);
}
} else
{var i = cljs.core.first.call(null,s__8201__$2);return cljs.core.cons.call(null,cljs.core.nth.call(null,self__.buf,cljs.core.rem.call(null,(self__.start + i),cljs.core.count.call(null,self__.buf))),iter__8200.call(null,cljs.core.rest.call(null,s__8201__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7455__auto__.call(null,cljs.core.range.call(null,self__.len));
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
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.tabs');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');


}

//# sourceMappingURL=
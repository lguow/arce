/**
 *	File: core.js 
 *
 *	Some functionality inspired by Ext, Yahoo, Prototype, jQuery, Mootools
 *	Inspiration taken *heavily* from <http://extjs.com/>
 *	version: 0.1
 */

if (typeof Al == 'undefined' || !Al) {
	var Al = {
		_version_ : '0.1',
		emptyFn : function() {},
		K : function(x) {return x;},
		golbal: {}
	};
}

Al.apply = function(o, c, defaults){
    if(defaults){
        // no "this" reference for friendly out of scope calls
        Al.add(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};

(function() {
	
	var Browser = function() {

		var isStrict = document.compatMode == "CSS1Compat";
		
	    var o = {

	        /**
	         * Internet Explorer version number or 0.  Example: 6
	         * @property ie
	         * @type float
	         */
	        ie:0,

	        /**
	         * Opera version number or 0.  Example: 9.2
	         * @property opera
	         * @type float
	         */
	        opera:0,

	        /**
	         * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7
	         * Firefox 1.5.0.9: 1.8.0.9 <-- Reports 1.8
	         * Firefox 2.0.0.3: 1.8.1.3 <-- Reports 1.8
	         * Firefox 3 alpha: 1.9a4   <-- Reports 1.9
	         */
	        gecko:0,

	        /**
	         * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the 
	         *                                   latest available for Mac OSX 10.3.
	         * Safari 2.0.2:         416     <-- hasOwnProperty introduced
	         * Safari 2.0.4:         418     <-- preventDefault fixed
	         * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run
	         *                                   different versions of webkit
	         * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been
	         *                                   updated, but not updated
	         *                                   to the latest patch.
	         * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native SVG
	         *                                   and many major issues fixed).  
	         * 3.x yahoo.com, flickr:422     <-- Safari 3.x hacks the user agent
	         *                                   string when hitting yahoo.com and 
	         *                                   flickr.com.
	         * Safari 3.0.4 (523.12):523.12  <-- First Tiger release - automatic update
	         *                                   from 2.x via the 10.4.11 OS patch
	         * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.
	         *                                   yahoo.com user agent hack removed.
	         */
	        webkit: 0
	    };

	    var ua=navigator.userAgent, m;

	    // Modern KHTML browsers should qualify as Safari X-Grade
	    if ((/KHTML/).test(ua)) {
	        o.webkit=1;
	    }

	    if (!o.webkit) { // not webkit
	        // @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
	        m=ua.match(/Opera[\s\/]([^\s]*)/);
	        if (m&&m[1]) {
	            o.opera=parseFloat(m[1]);
	            m=ua.match(/Opera Mini[^;]*/);
	            if (m) {
	                o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
	            }
	        } else { // not opera or webkit
	            m=ua.match(/MSIE\s([^;]*)/);
	            if (m&&m[1]) {
	                o.ie=parseFloat(m[1]);
	            } else { // not opera, webkit, or ie
	                m=ua.match(/Gecko\/([^\s]*)/);
	                if (m) {
	                    o.gecko=1; // Gecko detected, look for revision
	                    m=ua.match(/rv:([^\s\)]*)/);
	                    if (m&&m[1]) {
	                        o.gecko=parseFloat(m[1]);
	                    }
	                }
	            }
	        }
	    }
		
		return {
			isSafari : o.safari,
			isOpera : o.opera,
			isIE : o.ie,
			isGecok : o.gecko,
			
			isStrict : isStrict,			
			isBorderBox : o.ie && !isStrict	
		};		
	}();
	
	(function() {

	    // remove css image flicker
		if(Al.isIE >0 && Al.isIE < 7){
	        try{
	            document.execCommand("BackgroundImageCache", false, true);
	        }catch(e){}
	    }		
	})();

	Al.apply(Al, Browser);
	/**
	 * language util
	 */
	Al.apply(Al, {
		type : function(o){
            if(o === undefined || o === null){
                return false;
            }
            if(o.htmlElement){
                return 'element';
            }
            var t = typeof o;
            if(t == 'object' && o.nodeName) {
                switch(o.nodeType) {
                    case 1: return 'element';
                    case 3: return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
                }
            }
			if((typeof o.length == 'number') && o.callee) {
				return 'arguments';
			}
            if(t == 'object' || t == 'function') {
                switch(o.constructor) {
                    case Array: return 'array';
                    case RegExp: return 'regexp';
                }
                if(typeof o.length == 'number' && typeof o.item == 'function') {
                    return 'nodelist';
                }
            }
            return t;
        },
		isUndefined: function(o) {
	        return typeof o === "undefined";
	    },
	    isString: function(o) {
	        return typeof o === 'string';
	    },
	    isNumber: function(o) {
	        return typeof o === 'number' && isFinite(o);
	    },
	    isArray: function(o) { 
	        if (o) {
	           return Al.isNumber(o.length) && Al.isFunction(o.splice);
	        }
	        return false;
	    },
	    isFunction: function(o) {
	        return typeof o === 'function';
	    },
		isObject: function(o) {
			return (o && (typeof o === 'object' || Al.isFunction(o))) || false;
		},
		isDate : function(o){
			return o && typeof Al.isFunction(o.getFullYear);
		}
	});
	
	var idSeed = 0;
	
	Al.apply(Al, {
        applyIf : function(o, c){
            if(o && c){
                for(var p in c){
                    if(typeof o[p] == "undefined"){ o[p] = c[p]; }
                }
            }
            return o;
        },

        namespace : function(){
            var a=arguments, o=null, i, j, d, rt;
            for (i=0; i<a.length; ++i) {
                d=a[i].split(".");
                rt = d[0];
                eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
                for (j=1; j<d.length; ++j) {
                    o[d[j]]=o[d[j]] || {};
                    o=o[d[j]];
                }
            }
        },
		
		each : function(obj, fun) {
			var name;
			if (obj.length == undefined) {
				for (name in obj) {
					fun(name, obj[name]);
				}
			} else {
				for (var i=0, length = obj.length; i < length; i++) {
					fun.call(obj[i], i, obj[i]);		
				}
			}

			return obj;
		},
		
		A : function (iterable) {
			if (Al.isArray(iterable)) {
				return [].concat(iterable);
			}
			var nArray = [];
			for (var i=0,l=iterable.length; i < l; i++) {
				nArray.push(iterable[i]);
			}

			return nArray;
		},
		
		splat : function(obj){
			var type = Al.type(obj);
			return (type) ? ((type != 'array' && type != 'arguments') ? [obj] : obj) : [];
		},
		
		getBody : function() {
			return Al.isStrict ? document.documentElement : document.body;
		},
		
		id : function(el, prefix){
            prefix = prefix || "Al-gen";
            el = Cal.G(el);
            var id = prefix + (++idSeed);
            return el ? (el.id ? el.id : (el.id = id)) : id;
        }
	});
	Al.ns = Al.namespace;

	/**
	 * extend
	 */
	Al.apply(Al, {
		extend : function(){
		    // inline overrides
		    var io = function(o){
		        for(var m in o){
		            this[m] = o[m];
		        }
		    };
		    var oc = Object.prototype.constructor;

		    return function(sb, sp, overrides){
		        if(typeof sp == 'object'){
		            overrides = sp;
		            sp = sb;
		            sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
		        }
		        var F = function(){}, sbp, spp = sp.prototype;
		        F.prototype = spp;
		        sbp = sb.prototype = new F();
		        sbp.constructor=sb;
		        sb.superclass=spp;
		        if(spp.constructor == oc){
		            spp.constructor=sp;
		        }
		        sb.override = function(o){
		            Ext.override(sb, o);
		        };
		        sbp.override = io;
		        Al.override(sb, overrides);
		        sb.extend = function(o){Al.extend(sb, o);};
		        return sb;
		    };
		}(),

		override : function(origclass, overrides){
		    if(overrides){
		        var p = origclass.prototype;
		        for(var method in overrides){
		            p[method] = overrides[method];
		        }
		    }
		}
	});
	
	
	Al.unlink = function(object) {
		var unlinked = null;

		switch (Al.type(object)){
			case 'object':
				unlinked = {};
				for (var p in object) unlinked[p] = Al.unlink(object[p]);
			break;
			case 'array':
				unlinked = [];
				for (var i = 0, l = object.length; i < l; i++) unlinked[i] = Al.unlink(object[i]);
			break;
			default: return object;
		}

		return unlinked;	
	};


	Al.merge = function (){
			var mix = {};
			for (var i = 0, l = arguments.length; i < l; i++){
				var object = arguments[i];
				if (!Al.isObject(object)) continue;
				for (var key in object){
					var op = object[key], mp = mix[key];
					mix[key] = (mp && Al.isObject(op) && Al.isObject(mp)) ? Al.merge(mp, op) : Al.unlink(op);
				}
			}
			return mix;
	};
	
	//get element by id
	Al.G = function(el) {
        if(!el || !document){
            return null;
        }
        return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
    };
})();

Al.apply(Function.prototype, {
	/**
	 * Memoization
	 * http://talideon.com/weblog/2005/07/javascript-memoization.cfm
	 */
	memoize : function() {
		var pad  = {};
	    var self = this;
	    var obj  = arguments.length > 0 ? arguments[i] : null;

	    var memoizedFn = function() {
	        // Copy the arguments object into an array: allows it to be used as
	        // a cache key.
	        var args = [];
	        for (var i = 0; i < arguments.length; i++) {
	            args[i] = arguments[i];
	        }

	        // Evaluate the memoized function if it hasn't been evaluated with
	        // these arguments before.
	        if (!(args in pad)) {
	            pad[args] = self.apply(obj, arguments);
	        }

	        return pad[args];
	    };

	    memoizedFn.unmemoize = function() {
	        return self;
	    };

	    return memoizedFn;
	    
	}	
});

Al.applyIf(String, {
	trim : function(string){
		return string.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,"");
	}
});

Al.applyIf(Array.prototype, {

    indexOf : function(o){
       for (var i = 0, len = this.length; i < len; i++){
 	      if(this[i] == o) return i;
       }
 	   return -1;
    },

    remove : function(o){
       var index = this.indexOf(o);
       if(index != -1){
           this.splice(index, 1);
       }
       return this;
    },

	last : function() {
		return this[this.length - 1];
	},
	
	each : function(fn, bind){
		for(var i = 0; i < this.length ; i++) fn.call(bind, this[i], i);
	}
});(function(){var G,E,F={},C={},H=window.document;var B={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};Al.apply(Al,{trim:function(K){try{return K.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,"")}catch(L){return K}}});var I=function(K){if(!B.HYPHEN.test(K)){return K}if(F[K]){return F[K]}var L=K;while(B.HYPHEN.exec(L)){L=L.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase())}F[K]=L;return L};var J=function(L){var K=C[L];if(!K){K=new RegExp("(?:^|\\s+)"+L+"(?:\\s+|$)");C[L]=K}return K};if(H.defaultView&&H.defaultView.getComputedStyle){G=function(K,N){var M=null;if(N=="float"){N="cssFloat"}var L=K.ownerDocument.defaultView.getComputedStyle(K,"");if(L){M=L[I(N)]}return K.style[N]||M}}else{if(H.documentElement.currentStyle&&Al.isIE){G=function(K,M){switch(I(M)){case"opacity":var O=100;try{O=K.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(N){try{O=K.filters("alpha").opacity}catch(N){}}return O/100;case"float":M="styleFloat";default:var L=K.currentStyle?K.currentStyle[M]:null;return(K.style[M]||L)}}}else{G=function(K,L){return K.style[L]}}}if(Al.isIE){E=function(K,L,M){switch(L){case"opacity":if(YAHOO.lang.isString(K.style.filter)){K.style.filter="alpha(opacity="+M*100+")";if(!K.currentStyle||!K.currentStyle.hasLayout){K.style.zoom=1}}break;case"float":L="styleFloat";default:K.style[L]=M}}}else{E=function(K,L,M){if(L=="float"){L="cssFloat"}K.style[L]=M}}var A=function(K,L){return K&&K.nodeType==1&&(!L||L(K))};Al.Dom={getStyle:function(K,M){M=I(M);var L=function(N){return G(N,M)};return this.batch(K,L,Al.Dom,true)},setStyle:function(K,M,N){M=I(M);var L=function(O){E(O,M,N)};this.batch(K,L,Al.Dom,true)},getXY:function(K){var L=function(M){if((M.parentNode===null||M.offsetParent===null||this.getStyle(M,"display")=="none")&&M!=M.ownerDocument.body){return false}return D(M)};return this.batch(K,L,Al.Dom,true)},getX:function(K){var L=function(M){return this.getXY(M)[0]};return this.batch(K,L,Al.Dom,true)},getY:function(K){var L=function(M){return this.getXY(M)[1]};return this.batch(K,L,Al.Dom,true)},setXY:function(K,N,M){var L=function(Q){var P=this.getStyle(Q,"position");if(P=="static"){this.setStyle(Q,"position","relative");P="relative"}var S=this.getXY(Q);if(S===false){return false}var R=[parseInt(this.getStyle(Q,"left"),10),parseInt(this.getStyle(Q,"top"),10)];if(isNaN(R[0])){R[0]=(P=="relative")?0:Q.offsetLeft}if(isNaN(R[1])){R[1]=(P=="relative")?0:Q.offsetTop}if(N[0]!==null){Q.style.left=N[0]-S[0]+R[0]+"px"}if(N[1]!==null){Q.style.top=N[1]-S[1]+R[1]+"px"}if(!M){var O=this.getXY(Q);if((N[0]!==null&&O[0]!=N[0])||(N[1]!==null&&O[1]!=N[1])){this.setXY(Q,N,true)}}};this.batch(K,L,Al.Dom,true)},setX:function(L,K){this.setXY(L,[K,null])},setY:function(K,L){this.setXY(K,[null,L])},getElementsByClassName:function(O,S,P,Q){S=S||"*";P=(P)?Al.G(P):null||H;if(!P){return[]}var L=[],K=P.getElementsByTagName(S),R=J(O);for(var M=0,N=K.length;M<N;++M){if(R.test(K[M].className)){L[L.length]=K[M];if(Q){Q.call(K[M],K[M])}}}return L},hasClass:function(M,L){var K=J(L);var N=function(O){return K.test(O.className)};return this.batch(M,N,Al.Dom,true)},addClass:function(L,K){var M=function(N){if(this.hasClass(N,K)){return false}N.className=Al.trim([N.className,K].join(" "));return true};return Al.Dom.batch(L,M,Al.Dom,true)},removeClass:function(M,L){var K=J(L);var N=function(O){if(!L||!this.hasClass(O,L)){return false}var P=O.className;O.className=P.replace(K," ");if(this.hasClass(O,L)){this.removeClass(O,L)}O.className=Al.trim(O.className);return true};return this.batch(M,N,Al.Dom,true)},replaceClass:function(N,L,K){if(!K||L===K){return false}var M=J(L);var O=function(P){if(!this.hasClass(P,L)){this.addClass(P,K);return true}P.className=P.className.replace(M," "+K+" ");if(this.hasClass(P,L)){this.replaceClass(P,L,K)}P.className=Al.trim(P.className);return true};return this.batch(N,O,Al.Dom,true)},generateId:function(K,M){M=M||"yui-gen";var L=function(N){if(N&&N.id){return N.id}var O=M+YAHOO.env._id_counter++;if(N){N.id=O}return O};return this.batch(K,L,Al.Dom,true)||L.apply(Al.Dom,arguments)},batch:function(O,R,Q,M){O=(O&&(O.tagName||O.item))?O:Al.G(O);if(!O||!R){return false}var N=(M)?Q:window;if(O.tagName||O.length===undefined){return R.call(N,O,Q)}var P=[];for(var L=0,K=O.length;L<K;++L){P[P.length]=R.call(N,O[L],Q)}return P},getDocumentHeight:function(){var K=Al.isStrict?H.documentElement.scrollHeight:H.body.scrollHeight;return Math.max(K,this.getViewportHeight())},getDocumentWidth:function(){var K=Al.isStrict?H.documentElement.scrollWidth:H.body.scrollWidth;return Math.max(K,this.getViewportWidth())},getViewportHeight:function(){if(Al.isIE){return Al.isStrict?H.documentElement.clientHeight:H.body.clientHeight}else{return self.innerHeight}},getViewportWidth:function(){if(Al.isIE){return Al.isStrict?H.documentElement.clientWidth:H.body.clientWidth}else{return self.innerWidth}},getDocumentScrollLeft:function(K){K=K||H;return Math.max(K.documentElement.scrollLeft,K.body.scrollLeft)},getDocumentScrollTop:function(K){K=K||H;return Math.max(K.documentElement.scrollTop,K.body.scrollTop)},removeNode:Al.isIE?function(){var K;return function(L){if(L&&L.tagName!="BODY"){K=K||H.createElement("div");K.appendChild(L);K.innerHTML=""}}}():function(K){if(K&&K.parentNode&&K.tagName!="BODY"){K.parentNode.removeChild(K)}}};var D=function(){if(H.documentElement.getBoundingClientRect){return function(L){var M=L.getBoundingClientRect();var K=L.ownerDocument;return[M.left+Al.Dom.getDocumentScrollLeft(K),M.top+Al.Dom.getDocumentScrollTop(K)]}}else{return function(M){var N=[M.offsetLeft,M.offsetTop];var L=M.offsetParent;var K=(Al.isSafari&&Al.Dom.getStyle(M,"position")=="absolute"&&M.offsetParent==M.ownerDocument.body);if(L!=M){while(L){N[0]+=L.offsetLeft;N[1]+=L.offsetTop;if(!K&&Al.isSafari&&Al.Dom.getStyle(L,"position")=="absolute"){K=true}L=L.offsetParent}}if(K){N[0]-=M.ownerDocument.body.offsetLeft;N[1]-=M.ownerDocument.body.offsetTop}L=M.parentNode;while(L.tagName&&!B.ROOT_TAG.test(L.tagName)){if(L.scrollTop||L.scrollLeft){if(!B.OP_SCROLL.test(Al.Dom.getStyle(L,"display"))){if(!AlisOpera||Al.Dom.getStyle(L,"overflow")!=="visible"){N[0]-=L.scrollLeft;N[1]-=L.scrollTop}}}L=L.parentNode}return N}}}()})();(function(){
	/*
	 * Portions of this file are based on pieces of Yahoo User Interface Library
	 * Copyright (c) 2007, Yahoo! Inc. All rights reserved.
	 * YUI licensed under the BSD License:
	 * http://developer.yahoo.net/yui/license.txt
	 */
    Al.Event = function() {
        var listeners = [];
        var unloadListeners = [];
        var retryCount = 0;
        var counter = 0;
        var lastError = null;

		function fixEventName (eventName) {
			//TODO fix detail
			if (eventName == 'mousewheel') {
				eventName = Al.isGecok ? 'DOMMouseScroll' : 'mousewheel';
			}
			
			return eventName;
		}
		
        return {
            POLL_RETRYS: 200,
            POLL_INTERVAL: 20,
            EL: 0,
            TYPE: 1,
            FN: 2,
            WFN: 3,
            OBJ: 3,
            ADJ_SCOPE: 4,


            addListener : function(el, eventName, fn) {
                el = Al.G(el);
				
				eventName = fixEventName(eventName);
				
                if (!el || !fn) {
                    return false;
                }

                if ("unload" == eventName) {
                    unloadListeners[unloadListeners.length] =
                    [el, eventName, fn];
                    return true;
                }

                // prevent unload errors with simple check
                var wrappedFn = function(e) {
                    return typeof Al != 'undefined' ? fn.call(el, Al.Event.getEvent(e)) : false;
                };

                var li = [el, eventName, fn, wrappedFn];

                var index = listeners.length;
                listeners[index] = li;

                this.doAdd(el, eventName, wrappedFn, false);
                return true;

            },


            removeListener : function(el, eventName, fn) {
                var i, len;
				
				eventName = fixEventName(eventName);
				
                el = Al.G(el);

                if(!fn) {
                    return this.purgeElement(el, false, eventName);
                }


                if ("unload" == eventName) {

                    for (i = 0,len = unloadListeners.length; i < len; i++) {
                        var li = unloadListeners[i];
                        if (li &&
                            li[0] == el &&
                            li[1] == eventName &&
                            li[2] == fn) {
                            unloadListeners.splice(i, 1);
                            return true;
                        }
                    }

                    return false;
                }

                var cacheItem = null;


                var index = arguments[3];

                if ("undefined" == typeof index) {
                    index = this._getCacheIndex(el, eventName, fn);
                }

                if (index >= 0) {
                    cacheItem = listeners[index];
                }

                if (!el || !cacheItem) {
                    return false;
                }

                this.doRemove(el, eventName, cacheItem[this.WFN], false);

                delete listeners[index][this.WFN];
                delete listeners[index][this.FN];
                listeners.splice(index, 1);

                return true;

            },


            getTarget : function(ev, resolveTextNode) {
                ev = ev.browserEvent || ev;
                var t = ev.target || ev.srcElement;
                return this.resolveTextNode(t);
            },


            resolveTextNode : function(node) {
                if (Al.isSafari && node && 3 == node.nodeType) {
                    return node.parentNode;
                } else {
                    return node;
                }
            },


            getPageX: function(ev) {
                ev = ev.browserEvent || ev;
                var x = ev.pageX;
                if (!x && 0 !== x) {
                    x = ev.clientX || 0;

                    if (Al.isIE) {
                        x += this.getScroll()[1];
                    }
                }

                return x;
            },


            getPageY: function(ev) {
                ev = ev.browserEvent || ev;
                var y = ev.pageY;
                if (!y && 0 !== y) {
                    y = ev.clientY || 0;

                    if (Al.isIE) {
                        y += this.getScroll()[0];
                    }
                }

                return y;
            },


            getXY: function(ev) {
                ev = ev.browserEvent || ev;
                return [this.getPageX(ev), this.getPageY(ev)];
            },


            getRelatedTarget : function(ev) {
                ev = ev.browserEvent || ev;
                var t = ev.relatedTarget;
                if (!t) {
                    if (ev.type == "mouseout") {
                        t = ev.toElement;
                    } else if (ev.type == "mouseover") {
                        t = ev.fromElement;
                    }
                }

                return this.resolveTextNode(t);
            },


            stopEvent : function(ev) {
                this.stopPropagation(ev);
                this.preventDefault(ev);
            },


            stopPropagation : function(ev) {
                ev = ev.browserEvent || ev;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                } else {
                    ev.cancelBubble = true;
                }
            },


            preventDefault : function(ev) {
                ev = ev.browserEvent || ev;
                if(ev.preventDefault) {
                    ev.preventDefault();
                } else {
                    ev.returnValue = false;
                }
            },


            getEvent : function(e) {
                var ev = e || window.event;
                if (!ev) {
                    var c = this.getEvent.caller;
                    while (c) {
                        ev = c.arguments[0];
                        if (ev && Event == ev.constructor) {
                            break;
                        }
                        c = c.caller;
                    }
                }
                return ev;
            },


            getCharCode : function(ev) {
                ev = ev.browserEvent || ev;
                return ev.charCode || ev.keyCode || 0;
            },


            _getCacheIndex : function(el, eventName, fn) {
                for (var i = 0,len = listeners.length; i < len; ++i) {
                    var li = listeners[i];
                    if (li &&
                        li[this.FN] == fn &&
                        li[this.EL] == el &&
                        li[this.TYPE] == eventName) {
                        return i;
                    }
                }

                return -1;
            },


            elCache: {},
			
            getEl : function(id) {
                return document.getElementById(id);
            },

            clearCache : function() {
            },

            purgeElement : function(el, recurse, eventName) {
                var elListeners = this.getListeners(el, eventName);
                if (elListeners) {
                    for (var i = 0,len = elListeners.length; i < len; ++i) {
                        var l = elListeners[i];
                        this.removeListener(el, l.type, l.fn);
                    }
                }

                if (recurse && el && el.childNodes) {
                    for (i = 0,len = el.childNodes.length; i < len; ++i) {
                        this.purgeElement(el.childNodes[i], recurse, eventName);
                    }
                }
            },


            getListeners : function(el, eventName) {
                var results = [], searchLists;
                if (!eventName) {
                    searchLists = [listeners, unloadListeners];
                } else if (eventName == "unload") {
                    searchLists = [unloadListeners];
                } else {
                    searchLists = [listeners];
                }

                for (var j = 0; j < searchLists.length; ++j) {
                    var searchList = searchLists[j];
                    if (searchList && searchList.length > 0) {
                        for (var i = 0,len = searchList.length; i < len; ++i) {
                            var l = searchList[i];
                            if (l && l[this.EL] === el &&
                                (!eventName || eventName === l[this.TYPE])) {
                                results.push({
                                    type:   l[this.TYPE],
                                    fn:     l[this.FN],
                                    obj:    l[this.OBJ],
                                    adjust: l[this.ADJ_SCOPE],
                                    index:  i
                                });
                            }
                        }
                    }
                }

                return (results.length) ? results : null;
            },


            _unload : function(e) {

                var EU = Al.Event, i, j, l, len, index;

                for (i = 0,len = unloadListeners.length; i < len; ++i) {
                    l = unloadListeners[i];
                    if (l) {
                        var scope = window;
                        if (l[EU.ADJ_SCOPE]) {
                            if (l[EU.ADJ_SCOPE] === true) {
                                scope = l[EU.OBJ];
                            } else {
                                scope = l[EU.ADJ_SCOPE];
                            }
                        }
                        l[EU.FN].call(scope, EU.getEvent(e), l[EU.OBJ]);
                        unloadListeners[i] = null;
                        l = null;
                        scope = null;
                    }
                }

                unloadListeners = null;

                if (listeners && listeners.length > 0) {
                    j = listeners.length;
                    while (j) {
                        index = j - 1;
                        l = listeners[index];
                        if (l) {
                            EU.removeListener(l[EU.EL], l[EU.TYPE],
                                    l[EU.FN], index);
                        }
                        j = j - 1;
                    }
                    l = null;

                    EU.clearCache();
                }

                EU.doRemove(window, "unload", EU._unload);

            },


            getScroll : function() {
                var dd = document.documentElement, db = document.body;
                if (dd && (dd.scrollTop || dd.scrollLeft)) {
                    return [dd.scrollTop, dd.scrollLeft];
                } else if (db) {
                    return [db.scrollTop, db.scrollLeft];
                } else {
                    return [0, 0];
                }
            },


            doAdd : function () {
                if (window.addEventListener) {
                    return function(el, eventName, fn, capture) {
                        el.addEventListener(eventName, fn, false);
                    };
                } else if (window.attachEvent) {
                    return function(el, eventName, fn, capture) {
                        el.attachEvent("on" + eventName, fn);
                    };
                } else {
                    return function() {};
                }
            }(),


            doRemove : function() {
                if (window.removeEventListener) {
                    return function (el, eventName, fn, capture) {
                        el.removeEventListener(eventName, fn, (capture));
                    };
                } else if (window.detachEvent) {
                    return function (el, eventName, fn) {
                        el.detachEvent("on" + eventName, fn);
                    };
                } else {
                    return function() {
                    };
                }
            }()

        };

    }();

    var E = Al.Event;
    E.on = E.addListener;
    E.un = E.removeListener;
	E.stop = E.stopEvent;
    E.doAdd(window, "unload", E._unload);	
}());
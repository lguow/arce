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
});
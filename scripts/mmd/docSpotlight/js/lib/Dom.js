(function() {

	var getStyle,           // for load time browser branching
	    setStyle,           // ditto
	    propertyCache = {}, // for faster hyphen converts
	    reClassNameCache = {},          // cache regexes for className
	    document = window.document;     // cache for faster lookups
	
    // regex cache
    var patterns = {
        HYPHEN: /(-[a-z])/i, // to normalize get/setStyle
        ROOT_TAG: /^body|html$/i, // body for quirks mode, html for standards,
        OP_SCROLL:/^(?:inline|table-row)$/i
    };
	
	// make Dom no depend on Native/String.js
	Al.apply(Al, {
		trim : function(s){
			try {
				return s.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,"");
			} catch(e) {
				return s;
			}
		}
	});
	
    var toCamel = function(property) {
        if ( !patterns.HYPHEN.test(property) ) {
            return property; // no hyphens
        }

        if (propertyCache[property]) { // already converted
            return propertyCache[property];
        }

        var converted = property;

        while( patterns.HYPHEN.exec(converted) ) {
            converted = converted.replace(RegExp.$1,
                    RegExp.$1.substr(1).toUpperCase());
        }

        propertyCache[property] = converted;
        return converted;
    };
	
	var getClassRegEx = function(className) {
        var re = reClassNameCache[className];
        if (!re) {
            re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
            reClassNameCache[className] = re;
        }
        return re;
    };


    // branching at load instead of runtime
    if (document.defaultView && document.defaultView.getComputedStyle) { // W3C DOM method
        getStyle = function(el, property) {
            var value = null;
            
            if (property == 'float') { // fix reserved word
                property = 'cssFloat';
            }

            var computed = el.ownerDocument.defaultView.getComputedStyle(el, '');
            if (computed) { // test computed before touching for safari
                value = computed[toCamel(property)];
            }
            
            return el.style[property] || value;
        };
    } else if (document.documentElement.currentStyle && Al.isIE) { // IE method
        getStyle = function(el, property) {                         
            switch( toCamel(property) ) {
                case 'opacity' :// IE opacity uses filter
                    var val = 100;
                    try { // will error if no DXImageTransform
                        val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;

                    } catch(e) {
                        try { // make sure its in the document
                            val = el.filters('alpha').opacity;
                        } catch(e) {
                        }
                    }
                    return val / 100;
                case 'float': // fix reserved word
                    property = 'styleFloat'; // fall through
                default: 
                    // test currentStyle before touching
                    var value = el.currentStyle ? el.currentStyle[property] : null;
                    return ( el.style[property] || value );
            }
        };
    } else { // default to inline only
        getStyle = function(el, property) { return el.style[property]; };
    }
    
    if (Al.isIE) {
        setStyle = function(el, property, val) {
            switch (property) {
                case 'opacity':
                    if ( YAHOO.lang.isString(el.style.filter) ) { // in case not appended
                        el.style.filter = 'alpha(opacity=' + val * 100 + ')';
                        
                        if (!el.currentStyle || !el.currentStyle.hasLayout) {
                            el.style.zoom = 1; // when no layout or cant tell
                        }
                    }
                    break;
                case 'float':
                    property = 'styleFloat';
                default:
                el.style[property] = val;
            }
        };
    } else {
        setStyle = function(el, property, val) {
            if (property == 'float') {
                property = 'cssFloat';
            }
			
            el.style[property] = val;
        };
    }

    var testElement = function(node, method) {
        return node && node.nodeType == 1 && ( !method || method(node) );
    };	
	
	
	Al.Dom =  {
    
        getStyle: function(el, property) {
            property = toCamel(property);
            
            var f = function(element) {
                return getStyle(element, property);
            };
            
            return this.batch(el, f, Al.Dom, true);
        },
    

        setStyle: function(el, property, val) {
            property = toCamel(property);
            
            var f = function(element) {
                setStyle(element, property, val);
            };
            
            this.batch(el, f, Al.Dom, true);
        },
        
        getXY: function(el) {
            var f = function(el) {
                // has to be part of document to have pageXY
                if ( (el.parentNode === null || el.offsetParent === null ||
                        this.getStyle(el, 'display') == 'none') && el != el.ownerDocument.body) {
                    return false;
                }
                
                return getXY(el);
            };
            
            return this.batch(el, f, Al.Dom, true);
        },
        
        getX: function(el) {
            var f = function(el) {
                return this.getXY(el)[0];
            };
            
            return this.batch(el, f, Al.Dom, true);
        },
        
        getY: function(el) {
            var f = function(el) {
                return this.getXY(el)[1];
            };
            
            return this.batch(el, f, Al.Dom, true);
        },
        
        setXY: function(el, pos, noRetry) {
            var f = function(el) {
                var style_pos = this.getStyle(el, 'position');
                if (style_pos == 'static') { // default to relative
                    this.setStyle(el, 'position', 'relative');
                    style_pos = 'relative';
                }

                var pageXY = this.getXY(el);
                if (pageXY === false) { // has to be part of doc to have pageXY
                    return false; 
                }
                
                var delta = [ // assuming pixels; if not we will have to retry
                    parseInt( this.getStyle(el, 'left'), 10 ),
                    parseInt( this.getStyle(el, 'top'), 10 )
                ];
            
                if ( isNaN(delta[0]) ) {// in case of 'auto'
                    delta[0] = (style_pos == 'relative') ? 0 : el.offsetLeft;
                } 
                if ( isNaN(delta[1]) ) { // in case of 'auto'
                    delta[1] = (style_pos == 'relative') ? 0 : el.offsetTop;
                } 
        
                if (pos[0] !== null) { el.style.left = pos[0] - pageXY[0] + delta[0] + 'px'; }
                if (pos[1] !== null) { el.style.top = pos[1] - pageXY[1] + delta[1] + 'px'; }
              
                if (!noRetry) {
                    var newXY = this.getXY(el);

                    // if retry is true, try one more time if we miss 
                   if ( (pos[0] !== null && newXY[0] != pos[0]) || 
                        (pos[1] !== null && newXY[1] != pos[1]) ) {
                       this.setXY(el, pos, true);
                   }
                }        
        
            };
            
            this.batch(el, f, Al.Dom, true);
        },
        
        setX: function(el, x) {
            this.setXY(el, [x, null]);
        },
        

        setY: function(el, y) {
            this.setXY(el, [null, y]);
        },

        getElementsByClassName: function(className, tag, root, apply) {
            tag = tag || '*';
            root = (root) ? Al.G(root) : null || document; 
            if (!root) {
                return [];
            }

            var nodes = [],
                elements = root.getElementsByTagName(tag),
                re = getClassRegEx(className);

            for (var i = 0, len = elements.length; i < len; ++i) {
                if ( re.test(elements[i].className) ) {
                    nodes[nodes.length] = elements[i];
                    if (apply) {
                        apply.call(elements[i], elements[i]);
                    }
                }
            }
            
            return nodes;
        },

        hasClass: function(el, className) {
            var re = getClassRegEx(className);

            var f = function(el) {
                return re.test(el.className);
            };
            
            return this.batch(el, f, Al.Dom, true);
        },

        addClass: function(el, className) {
            var f = function(el) {
                if (this.hasClass(el, className)) {
                    return false; // already present
                }
                
                
                el.className = Al.trim([el.className, className].join(' '));
                return true;
            };
            
            return Al.Dom.batch(el, f, Al.Dom, true);
        },
    
        removeClass: function(el, className) {
            var re = getClassRegEx(className);
            
            var f = function(el) {
                if (!className || !this.hasClass(el, className)) {
                    return false; // not present
                }                 

                
                var c = el.className;
                el.className = c.replace(re, ' ');
                if ( this.hasClass(el, className) ) { // in case of multiple adjacent
                    this.removeClass(el, className);
                }

                el.className = Al.trim(el.className); // remove any trailing spaces
                return true;
            };
            
            return this.batch(el, f, Al.Dom, true);
        },
        
        replaceClass: function(el, oldClassName, newClassName) {
            if (!newClassName || oldClassName === newClassName) { // avoid infinite loop
                return false;
            }
            
            var re = getClassRegEx(oldClassName);

            var f = function(el) {
            
                if ( !this.hasClass(el, oldClassName) ) {
                    this.addClass(el, newClassName); // just add it if nothing to replace
                    return true; // NOTE: return
                }
            
                el.className = el.className.replace(re, ' ' + newClassName + ' ');

                if ( this.hasClass(el, oldClassName) ) { // in case of multiple adjacent
                    this.replaceClass(el, oldClassName, newClassName);
                }

                el.className = Al.trim(el.className); // remove any trailing spaces
                return true;
            };
            
            return this.batch(el, f, Al.Dom, true);
        },
        
        generateId: function(el, prefix) {
            prefix = prefix || 'yui-gen';

            var f = function(el) {
                if (el && el.id) { // do not override existing ID
                    return el.id;
                } 

                var id = prefix + YAHOO.env._id_counter++;

                if (el) {
                    el.id = id;
                }
                
                return id;
            };

            // batch fails when no element, so just generate and return single ID
            return this.batch(el, f, Al.Dom, true) || f.apply(Al.Dom, arguments);
        },
       
        
        batch: function(el, method, o, override) {
            el = (el && (el.tagName || el.item)) ? el : Al.G(el); // skip get() when possible

            if (!el || !method) {
                return false;
            } 
            var scope = (override) ? o : window;
            
            if (el.tagName || el.length === undefined) { // element or not array-like 
                return method.call(scope, el, o);
            } 

            var collection = [];
            
            for (var i = 0, len = el.length; i < len; ++i) {
                collection[collection.length] = method.call(scope, el[i], o);
            }
            
            return collection;
        },

	    getDocumentHeight : function() {
	        var scrollHeight = Al.isStrict ? document.documentElement.scrollHeight : document.body.scrollHeight;
	        return Math.max(scrollHeight, this.getViewportHeight());
	    },

	    getDocumentWidth : function() {
	        var scrollWidth = Al.isStrict ? document.documentElement.scrollWidth : document.body.scrollWidth;
	        return Math.max(scrollWidth, this.getViewportWidth());
	    },

	    getViewportHeight : function(){
	        if(Al.isIE){
	            return Al.isStrict ? document.documentElement.clientHeight :
	                     document.body.clientHeight;
	        }else{
	            return self.innerHeight;
	        }
	    },

	    getViewportWidth : function() {
	        if(Al.isIE){
	            return Al.isStrict ? document.documentElement.clientWidth :
	                     document.body.clientWidth;
	        }else{
	            return self.innerWidth;
	        }
	    },

		getDocumentScrollLeft: function(doc) {
            doc = doc || document;
            return Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
        }, 

        getDocumentScrollTop: function(doc) {
            doc = doc || document;
            return Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
        },

		removeNode : Al.isIE ? function(){
            var d;
            return function(n){
                if(n && n.tagName != 'BODY'){
                    d = d || document.createElement('div');
                    d.appendChild(n);
                    d.innerHTML = '';
                }
            };
        }() : function(n){
            if(n && n.parentNode && n.tagName != 'BODY'){
                n.parentNode.removeChild(n);
            }
        }
	};
	
	var getXY = function() {
        if (document.documentElement.getBoundingClientRect) { // IE
            return function(el) {
                var box = el.getBoundingClientRect();

                var rootNode = el.ownerDocument;
                return [box.left + Al.Dom.getDocumentScrollLeft(rootNode), box.top +
                        Al.Dom.getDocumentScrollTop(rootNode)];
            };
        } else {
            return function(el) { // manually calculate by crawling up offsetParents
                var pos = [el.offsetLeft, el.offsetTop];
                var parentNode = el.offsetParent;

                // safari: subtract body offsets if el is abs (or any offsetParent), unless body is offsetParent
                var accountForBody = (Al.isSafari &&
                        Al.Dom.getStyle(el, 'position') == 'absolute' &&
                        el.offsetParent == el.ownerDocument.body);

                if (parentNode != el) {
                    while (parentNode) {
                        pos[0] += parentNode.offsetLeft;
                        pos[1] += parentNode.offsetTop;
                        if (!accountForBody && Al.isSafari && 
                                Al.Dom.getStyle(parentNode,'position') == 'absolute' ) { 
                            accountForBody = true;
                        }
                        parentNode = parentNode.offsetParent;
                    }
                }

                if (accountForBody) { //safari doubles in this case
                    pos[0] -= el.ownerDocument.body.offsetLeft;
                    pos[1] -= el.ownerDocument.body.offsetTop;
                } 
                parentNode = el.parentNode;

                // account for any scrolled ancestors
                while ( parentNode.tagName && !patterns.ROOT_TAG.test(parentNode.tagName) ) 
                {
                    if (parentNode.scrollTop || parentNode.scrollLeft) {
                        // work around opera inline/table scrollLeft/Top bug (false reports offset as scroll)
                        if (!patterns.OP_SCROLL.test(Al.Dom.getStyle(parentNode, 'display'))) { 
                            if (!AlisOpera || Al.Dom.getStyle(parentNode, 'overflow') !== 'visible') { // opera inline-block misreports when visible
                                pos[0] -= parentNode.scrollLeft;
                                pos[1] -= parentNode.scrollTop;
                            }
                        }
                    }
                    
                    parentNode = parentNode.parentNode; 
                }

                return pos;
            };
        }
    }(); // NOTE: Executing for loadtime branching
})();

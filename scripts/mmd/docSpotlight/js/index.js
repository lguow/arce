var TimeOut = false;
var resultControl;
var STORE;

if (isOnLine()) {
	window.onload = function() {
		STORE = new Persist.Store('spotLightMemory', {
			swf_path : 'js/persist/persist.swf'
		});

		STORE.get('selectMemory', function(ok, val) {
	    	if (ok) {
				if (val) {
					if (val.value) {
						selectMemory.loadCache(JSON.parse(val.value));
					} else {
						selectMemory.loadCache(JSON.parse(val));
					}
				}
			}
	    });
	};
}



function isOnLine() {
	if(/^http.*/.test(document.URL)) {
		return true;
	} else {
		return false;
	}
};


var selectMemory = function() {
	var cache = {};
	
	function getCache (kw, type) {
		type = (type == '') ? '___ALL___' : type;
		
		if (cache[kw]) {
			if (cache[kw][type]) {
				return cache[kw][type];
			}
		} else {
			return false;
		}
	}
	
	function setCache (kw, type, idx) {
		type = (type == '') ? '___ALL___' : type;
		
		if (Al.isUndefined(cache[kw])) {
			cache[kw] = {};
		} 
		
		cache[kw][type] = idx;
		
		STORE.set('selectMemory', JSON.stringify(selectMemory.getCache()));
		STORE.save();
	}
	
	return {
		get : function(kw, type) {
			return getCache(kw, type);
		},
		set : function(kw, type, idx) {
			return setCache(kw, type, idx);
		},
		getCache : function() {
			return cache;
		},
		loadCache : function(data) {
			cache = data;
		}
	};
}();

(function(){
	spotLight.init(docData);

	
	var keyWords;
	
	(function(){
		keyWords = spotLight.getKeyWords();
		var options = ['<select><option value="" elected="elected">All</option>'];
		Al.each(keyWords, function(idx, value) {
			options.push('<option value="'+ value +'">'+ value +'</option>');
		});
		options.push('</select>');
		Al.G('searchType').innerHTML = options.join('');
		
	})();
	
	Al.G('searchType').getElementsByTagName('select')[0].onchange = function() {
		search();
	};
	
	Al.G('search').onkeydown = function(event) {
		var e = event || window.event;
		
		var code = e.charCode || e.keyCode;

		function preventDefault(){
			if(e.preventDefault) {
	            e.preventDefault();
	        } else {
	            e.returnValue = false;
	        }
		}
		
		var Keys = {
			'UP': 38,
			'DOWN': 40,
			'ENTER': 13,
			'RIGHT': 39,
			'LEFT': 37
		};

		if (code == Keys.UP) {
			preventDefault();
			resultControl.moveUp();
		} else if (code == Keys.DOWN) {
			preventDefault();
			resultControl.moveDown();
		} else if (code == Keys.ENTER) {
			resultControl.enter();
		} else if (code == Keys.LEFT || code == Keys.RIGHT) {
			return;
		} else {
			if (TimeOut != false) {
				try {
					clearTimeout(timeOut);
				} catch(e) {

				}

			} else {
				TimeOut = setTimeout(search, 300);
			}
		}
	};
	
	function search() {
		var kw = Al.G('search').value;
		var type = Al.G('searchType').getElementsByTagName('select')[0].value;
		
		Al.G('result').innerHTML = buildResult(spotLight.search(kw, type));

		var table = Al.G('result').getElementsByTagName('table')[0];

		if (table) {
			sorttable.makeSortable(table);
		}
		
		if(Al.isIE && Al.isIE < 7) {
			var tbody = Al.G('result').getElementsByTagName('tbody')[0];
			if (tbody) {
				var trs = tbody.getElementsByTagName('tr');
				for(var i=0,l=trs.length; i<l; i++) {
					trs[i].onmouseover = function() {
						Al.Dom.addClass(this, 'ie6Hover');
					};
					trs[i].onmouseout = function() {
						Al.Dom.removeClass(this, 'ie6Hover');
					};
				}
			}

		}
		
		resultControl.rebuild();
		
		var idx = selectMemory.get(kw, type);
				
		if (idx) {
			resultControl.focusOne(idx);
		}
		
		TimeOut = false;
	};
	
	var buildResult = function(data){
		
		if(data.length == 0) {
			return '<div style="text-align:center">no result</div>';
		}
		
		var tableTmp = ['<table cellspacing="0">', '<caption>'+ data.length +' Results</caption>', '<thead><tr>'];
		
		var keys = Al.A(keyWords).remove('summary');
		
		var urlIdx = keys.indexOf('url');
		
		Al.each(keys, function(idx, value){
			tableTmp.push('<th>'+ value + '</th>');
		});
		
		tableTmp.push('</tr></thead><tbody>');
		
		Al.each(data, function(idx, value){
			var dataTmp = [];
			for(var o in value) {
				var keyWordIdx = keys.indexOf(o);
				if(keyWordIdx != -1) {
					dataTmp[keyWordIdx] = value[o];
				};
			}
			tableTmp.push('<tr>');
			
			Al.each(dataTmp, function(i, v) {
				if (v) {
					if (i == urlIdx) {
						v = '<a href="'+v+'" target="_blank">'+ v.split('/').last() +'</a>';
					}
				} else {
					v = 'none';
				}
				
				tableTmp.push('<td>' + v + ' </td>');
			});
			tableTmp.push('</tr>');
		});
		tableTmp.push('</tbody></html>');
		
		return tableTmp.join('');
		
	};
	

	
	
	resultControl = function() {
		
		function getUrl() {
			var keys = Al.A(keyWords).remove('summary');
			var trs = getTrs();
			var tds = trs[currIdx].getElementsByTagName('td');
			var a = tds[keys.indexOf('url')].getElementsByTagName('a')[0];
			return a;
		}


		function getTrs() {
			var result = Al.G('result');
			var tbody = result.getElementsByTagName('tbody')[0];
			if (tbody) {
				return tbody.getElementsByTagName('tr');
			} else {
				return [];
			}
		}
		
		var trs;
		
		var currIdx;
		
		var init = false;
		
		function rebuild() {
			currIdx = 0;
			trs = getTrs();
			moveUp();
		}
		
		function setFocus(idx) {
			if (trs[idx]) {
				Al.Dom.addClass(trs[idx], 'trFocus');
				window.status = getUrl();
			}
		}
		
		function setBlur(idx) {
			if (trs[idx]) {
				Al.Dom.removeClass(trs[idx], 'trFocus');
			}		
		}
		
		function moveUp() {
			if (currIdx == 0) {
				setFocus(0);
			} else {
				currIdx = currIdx - 1;
				setFocus(currIdx);
				setBlur(currIdx + 1);
			}
		}
	
		function moveDown() {
			if (trs.length == currIdx + 1) {
				currIdx = trs.length - 1;
				setFocus(trs.length);
			} else {
				currIdx = currIdx + 1;
				setFocus(currIdx);
				setBlur(currIdx - 1);
			}
		}
		
		function enter() {
			var kw = Al.G('search').value;
			var type = Al.G('searchType').getElementsByTagName('select')[0].value;
			selectMemory.set(kw, type, currIdx);
			
			window.open(getUrl().href);
		}
		
		function resetIdx() {
			var trs = getTrs();
			
			Al.each(trs, function(i, v) {
				if (Al.Dom.hasClass(v, 'trFocus')) {
					currIdx = i;
					return;
				}
			});
			
			return 0;
			
		}
		
		function focusOne(idx){
			if (idx >= 0 && idx <= trs.length - 1) {
				setBlur(currIdx);
				setFocus(idx);
				currIdx = idx;
			}
		}
		
		return {
			moveUp : function() {
				return moveUp();
			},
			moveDown : function() {
				return moveDown();
			},
			enter : function() {
				return enter();
			},
			
			rebuild : function() {
				rebuild();
			},
			
			resetIdx : function() {
				resetIdx();
			},
			
			focusOne : function(idx) {
				focusOne(idx);
			}
		};
	}();
	
})();


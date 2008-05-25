var TimeOut = false;

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
		
		TimeOut = false;
	};
	
	var buildResult = function(data){
		
		if(data.length == 0) {
			return '<div style="text-align:center">no result</div>';
		}
		
		var tableTmp = ['<table cellspacing="0">', '<caption>Result</caption>', '<thead>'];
		
		var keys = Al.A(keyWords).remove('summary');
		
		var urlIdx = keys.indexOf('url');
		
		Al.each(keys, function(idx, value){
			tableTmp.push('<th>'+ value + '</th>');
		});
		
		tableTmp.push('</thead><tbody>');
		
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
				if (v == null) {
					v = '';
				}
				if (i == urlIdx) {
					v = '<a href="'+v+'" target="_blank">'+ v.split('/').last() +'</a>';
				}
				tableTmp.push('<td>' + v + '</td>');
			});
			tableTmp.push('</tr>');
		});
		tableTmp.push('</tbody></html>');
		
		return tableTmp.join('');
		
	};
	

	
	
	var resultControl = function() {
		
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
		
		function enter () {
			window.open(getUrl().href);
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
			}
			
		};
	}();
	
})();


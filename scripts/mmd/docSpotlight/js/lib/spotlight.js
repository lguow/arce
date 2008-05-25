var spotLight = function() {
	
	var docData;
	
	var searchDataCache = {};
	
	var searchDataPinYinCache = {};
	
	var initialed = false;
		
	var keyWords = false;
	
	var useShortCut = true;
	
	var getPinyYinCode = function(kw) {
		var charCode = kw.charCodeAt();
		return (charCode<1000||charCode>60000) ? kw : PinYin.lookUpWord(kw);	
	}.memoize();
	
	var buildSearchData = function(type, usePinyin) {
		
		var buildData = [];
		var buildDataPinyin = [];
		
		if (Al.isUndefined(type)||type == '') {
			var type = '___ALL___';
		}
		
	
		var getPinyin = function(kw) {
			var pinyinTmp = [];
			
			var str = Al.isArray(kw) ? kw.join('') : kw;

			Al.each(str.split(''), function(key, value) {
				pinyinTmp.push(getPinyYinCode(value));
			});
			
			return pinyinTmp.join('');
		}.memoize();
				
		if (type == '___ALL___') {
			Al.each(docData, function(key, value) {
				var docDataTmp = [];

				for (var o in value) {
					docDataTmp.push(value[o]);
				}
				
				if (usePinyin) {
					buildDataPinyin.push(getPinyin(docDataTmp).toLowerCase());
				}
				
				buildData.push(docDataTmp.join('').toLowerCase());
			});
		} else {
			for (var o in docData) {
				if (docData[o][type]) {
					buildData.push(docData[o][type]);
					if (usePinyin) {
						buildDataPinyin.push(getPinyin(docData[o][type]).toLowerCase());
					}
				} else {
					buildData.push('');
				}
			}
		}
		
		
		return usePinyin ? buildDataPinyin : buildData;
	}.memoize();
	
	
	function findData(kw, searchData) {
		var kw = String.trim(kw);
		
		var kw = kw.split(' ');
		
		var resultIndex = false;
		
		var firstRun = true;
		
		for (var i=0, l=kw.length; i < l; i++) {
			kw[i] = String.trim(kw[i]);
			var rgx;
			
			
			if (!firstRun) {
				
				var resultIndexTmp = [];
				Al.each(resultIndex, function(idx, value) {
					if (useShortCut) {
						
						if (/^["'].*["']$/.test(kw[i])) {
							if (searchData[value].indexOf(kw[i].match(/^["'](.*)["']$/)[1]) != -1) {
								resultIndexTmp.push(value);
							}	
						} else {
							var tmpExpArray = [];
							kw[i].split('').each(function(v){
									tmpExpArray.push(v + '.*');
							});
							if (new RegExp(tmpExpArray.join('')).test(searchData[value])) {
									resultIndexTmp.push(value);
							}
						}
	
					} else {
						if (searchData[value].indexOf(kw[i]) != -1) {
							resultIndexTmp.push(value);
						}	
					}
					
				});
				resultIndex = resultIndexTmp;
			} else {
				var resultIndex = [];				
				Al.each(searchData, function(key, value) {
					if (useShortCut) {
						
						if (/^["'].*["']$/.test(kw[0])) {
							
							if (value.indexOf(kw[0].match(/^["'](.*)["']$/)[1]) != -1) {
								resultIndex.push(key);
							}	
						} else {
							var tmpExpArray = [];

							kw[0].split('').each(function(v){
								tmpExpArray.push(v + '.*');
							});
							
							if (new RegExp(tmpExpArray.join('')).test(value)) {
								resultIndex.push(key);
							}
						}
						
					} else {
						
						if(value.indexOf(kw[0]) != -1) {
							resultIndex.push(key);
						}
					}
				});
				firstRun = false;
			}
		}
		
		return resultIndex;
	}
	
	function _init (data, type) {
		docData = data;
	}
	
	function _search (kw, type) {
		
		if (/^[a-z0-9 "']*$/i.test(kw)) {
			var searchData = buildSearchData(type, true);
		} else {
			var searchData = buildSearchData(type, false);
		}
				

		var resultIndex = findData(kw, searchData);
		
		var returnData = [];
		Al.each(resultIndex, function(key, value) {
			returnData.push(docData[value]);
		});
		
		return returnData;
	}
	
	function _getKeyWords() {
		
		if (keyWords) {
			return keyWords;
		} else {
			keyWords = [];
			var keyWordsTmp = {};

			Al.each(docData, function(key, value) {
				for(var i in value) {
					if (Al.isUndefined(keyWordsTmp[i])) {
						keyWordsTmp[i] = true;
						keyWords.push(i);
					}
				}
			});
			return keyWords;			
		}
		
	}
	
	return {
		init : function(data) {
			return _init(data);
		},
		search : function(kw, type) {
			return _search(kw, type);
		}.memoize(),
		getKeyWords : function() {
			return _getKeyWords();
		}
	};
}();
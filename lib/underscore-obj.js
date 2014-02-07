(function(){
	var isNodeJS = true;

	try{
		module;
		exports;
	}catch(e){
		isNodeJS = false;
	}
	
	if(isNodeJS){
		_ = require("underscore");
	}else{
		try{
			_;
		}catch(e){
			throw new Error("underscore.js is not found!");
		}
	}

	function capitalize(str){
		str = str == null ? '' : String(str);
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function getProperty(obj, name){
		if(name == ""){
			return obj;
		}

		var target = obj["get" + capitalize(name)];
		
		if(target === undefined){
			target = obj["is" + capitalize(name)];
		}

		if(target === undefined){
			target = obj[name];
		}

		if(typeof target === "function"){
			target = target.call(obj);
		}

		return target;
	}

	function setProperty(obj, name, value){
		var setter = obj["set" + capitalize(name)];
		if(setter){
			setter.call(obj, value);
		}else{
			obj[name] = value;
		}
	}

	function matchQuery(obj, query){
		var match = true;
		var eachKeyPath, expected;

		for(eachKeyPath in query){
			expected = query[eachKeyPath];
			if(_(obj).valueForKeyPath(eachKeyPath) != expected){
				match = false;
				break;
			}
		}

		return match;
	};

	_.mixin({
		valueForKeyPath : function(obj, keypath, fallback){
			if(typeof keypath != "string"){
				throw new Error("keypath must be a string");
			}
			
			if(obj === null || obj === undefined){
				return fallback;
			}

			var finger = obj;
			var segments = keypath.split(".");
			var next = segments.shift();
			var parent = undefined;

			while(finger !== null && finger !== undefined && typeof next === "string"){
				parent = finger;
				finger = getProperty(finger, next);
				if(typeof finger === "function"){
					finger = finger.call(parent);
				}
				next = segments.shift();
			}

			return finger || fallback;
		},

		setValueForKeyPath : function(obj, keypath, newValue){
			if(typeof keypath != "string"){
				throw new Error("keypath must be a string");
			}
			var segments = keypath.split(".");
			var lastPropertyName = segments.pop();
			var target = _(obj).valueForKeyPath(segments.join("."));

			if(target !== null && target !== undefined){
				setProperty(target, lastPropertyName, newValue);
			}
		},

		pluckByKeyPath : function(array, keypath){
			var result = [];
			var i, each;

			for(i in array){
				each = array[i];
				result[i] = _(each).valueForKeyPath(keypath);
			}

			return result;
		},

		whereByKeyPath : function(array, query){
			"use strict";
			var result = [];
			var i, each;
			var eachKeyPath, expected;

			for(i in array){
				each = array[i];
				if(matchQuery(each, query)){
					result.push(each);
				}
			}
			return result;
		},

		findWhereByKeyPath : function(array, query){
			"use strict";
			var result = [];
			var i, each;
			var eachKeyPath, expected;

			for(i in array){
				each = array[i];
				if(matchQuery(each, query)){
					return each;
				}
			}

			return null;
		}

	});
	
	if(isNodeJS){
		module.exports = _;
	}
})();

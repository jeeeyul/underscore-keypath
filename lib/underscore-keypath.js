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

	var arrayPropertyResolvers = {
		"@first" : function(array){
			return _.first(array);
		},
		"@last" : function(array){
			return _.last(array);
		},
		"@max" : function(array){
			return _.max(array);
		},
		"@min" : function(array){
			return _.min(array);
		},
		"@size" : function(array){
			return _.size(array);
		}
	};

	function toSegments(keypath){
		if(typeof keypath == "object" && keypath.constructor.name == "Array"){
			return keypath;
		}else if(typeof keypath == "string"){
			return keypath.split(".");
		}else{
			throw new Error("keypath must be an array or a string");
		}
	}

	function capitalize(str){
		str = str == null ? '' : String(str);
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function getArrayProperty(array, name){
		var resolver = arrayPropertyResolvers[name];

		if(resolver){
			return resolver(array);
		}

		else{
			console.error("Unknown array property!", name);
			return undefined;
		}
	};

	function getProperty(obj, name){
		if(name == ""){
			return obj;
		}
		
		else if(name.indexOf("@") === 0){
			return getArrayProperty(obj, name);
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

	function hasProperty(obj, name){
		if(name == ""){
			return true;
		}
		
		return typeof obj["get" + capitalize(name)] == "function"
			|| typeof obj["is" + capitalize(name)] == "function"
			|| _.has(obj, name);
	}

	function setProperty(obj, name, value){
		var setter = obj["set" + capitalize(name)];
		if(setter){
			return setter.call(obj, value);
		}else{
			return obj[name] = value;
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

	var mixins = {
		valueForKeyPath : function(obj, keypath, fallback){
			if(obj === null || obj === undefined){
				return fallback;
			}

			var finger = obj;
			var segments = toSegments(keypath);
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
			var segments = toSegments(keypath);
			var lastPropertyName = segments.pop();
			var target = _(obj).valueForKeyPath(segments.join("."));

			if(target !== null && target !== undefined){
				return setProperty(target, lastPropertyName, newValue);
			}else{
				return undefined;
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
		},

		sortByKeyPath : function(array, keyPath){
			if(typeof keyPath !== "string"){
				return _.sortBy(array, keyPath);
			}else{
				return _.sortBy(array, function(it){
					return _.valueForKeyPath(it, keyPath);
				});
			}
		},

		groupByKeyPath : function(array, keyPath){
			if(typeof keyPath !== "string"){
				return _.groupBy(array, keyPath);
			}else{
				return _.groupBy(array, function(it){
					return _.valueForKeyPath(it, keyPath);
				});
			}
		},

		indexByKeyPath : function(array, keyPath){
			if(typeof keyPath !== "string"){
				return _.indexBy(array, keyPath);
			}else{
				return _.indexBy(array, function(it){
					return _.valueForKeyPath(it, keyPath);
				});
			}
		},

		countByKeyPath : function(array, keyPath){
			if(typeof keyPath !== "string"){
				return _.countBy(array, keyPath);
			}else{
				return _.countBy(array, function(it){
					return _.valueForKeyPath(it, keyPath);
				});
			}
		},

		hasKeyPath : function(obj, keyPath){
			if(obj == null || obj == undefined){
				return false;
			}

			var segments = toSegments(keyPath);
			var last = segments.pop();
			var target = _.valueForKeyPath(obj, segments);
			if(target != null && target != undefined){
				return hasProperty(target, last);
			}
			else{
				return false;
			}
		}

	};

	var alisas = {
		"getValueForKeyPath" : mixins.valueForKeyPath
	};
	
	_.mixin(mixins);
	_.mixin(alisas);

	if(isNodeJS){
		module.exports = _;
	}

})();

/* jshint curly:false */
/* jshint undef:true */
/* jshint trailing:true */
/* jshint laxcomma:true */
/* jshint white:true*/
/* global module, require */
(function () {
	var root = this, isNodeJS, arrayPropertyResolvers, mixins, aliases, _;
	isNodeJS = typeof module !== undefined && typeof module.exports !== undefined;
	
	if (isNodeJS) {
		_ = require("underscore");
	} else {
		_ = root._;
	}

	if (typeof _ === undefined) {
		throw new Error("underscore.js is not found!");
	}

	arrayPropertyResolvers = {
		"@first" : function (array) {
			return _.first(array);
		},
		"@last" : function (array) {
			return _.last(array);
		},
		"@max" : function (array) {
			return _.max(array);
		},
		"@min" : function (array) {
			return _.min(array);
		},
		"@size" : function (array) {
			return _.size(array);
		}
	};

	function toSegments(keypath) {
		"use strict";
		if (typeof keypath === "object" && keypath.constructor.name === "Array") {
			return keypath;
		}
		if (typeof keypath === "string") {
			return keypath.split(".");
		}
		throw new Error("keypath must be an array or a string");
	}

	function capitalize(str) {
		"use strict";
		str = str === null ? '' : String(str);
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function getArrayProperty(array, name) {
		"use strict";
		var resolver = arrayPropertyResolvers[name];

		if (resolver) {
			return resolver(array);
		}

		return undefined;
	}

	function getProperty(obj, name) {
		"use strict";
		if (name === "") {
			return obj;
		}
		
		if (name.indexOf("@") === 0) {
			return getArrayProperty(obj, name);
		}

		var target = obj["get" + capitalize(name)];
		
		if (target === undefined) {
			target = obj["is" + capitalize(name)];
		}

		if (target === undefined) {
			target = obj[name];
		}

		if (typeof target === "function") {
			target = target.call(obj);
		}

		return target;
	}

	function hasProperty(obj, name) {
		"use strict";
		if (name === "") {
			return true;
		}
		
		return typeof obj["get" + capitalize(name)] === "function" ||
			typeof obj["is" + capitalize(name)] === "function" ||
			_.has(obj, name);
	}

	function setProperty(obj, name, value) {
		"use strict";
		var setter = obj["set" + capitalize(name)];
		if (setter) {
			return setter.call(obj, value);
		}
		obj[name] = value;
		return value;
	}

	function matchQuery(obj, query) {
		"use strict";
		var match = true, eachKeyPath, expected;

		for (eachKeyPath in query) {
			if (query.hasOwnProperty(eachKeyPath)) {
				expected = query[eachKeyPath];
				if (_(obj).valueForKeyPath(eachKeyPath) !== expected) {
					match = false;
					break;
				}
			}
		}

		return match;
	}


	mixins = {
		valueForKeyPath : function (obj, keypath, fallback) {
			"use strict";
			var finger = obj, segments, next, parent;

			if (obj === null || obj === undefined) {
				return fallback;
			}

			segments = toSegments(keypath);
			next = segments.shift();
			parent = undefined;

			while (finger !== null && finger !== undefined && typeof next === "string") {
				parent = finger;
				finger = getProperty(finger, next);
				if (typeof finger === "function") {
					finger = finger.call(parent);
				}
				next = segments.shift();
			}

			return finger || fallback;
		},

		setValueForKeyPath : function (obj, keypath, newValue) {
			"use strict";
			var segments = toSegments(keypath), lastPropertyName, target;

			lastPropertyName = segments.pop();
			target = _(obj).valueForKeyPath(segments.join("."));

			if (target !== null && target !== undefined) {
				return setProperty(target, lastPropertyName, newValue);
			}
			
			return undefined;
		},

		pluckByKeyPath : function (array, keypath) {
			"use strict";
			var result = [], i, each;

			for (i = 0; i < array.length; i += 1) {
				each = array[i];
				result[i] = _(each).valueForKeyPath(keypath);
			}

			return result;
		},

		whereByKeyPath : function (array, query) {
			"use strict";
			var result = [], i, each, eachKeyPath, expected;

			for (i = 0; i < array.length; i += 1) {
				each = array[i];
				if (matchQuery(each, query)) {
					result.push(each);
				}
			}
			return result;
		},

		findWhereByKeyPath : function (array, query) {
			"use strict";
			var result = [], i, each, eachKeyPath, expected;

			for (i = 0; i < array.length; i += 1) {
				each = array[i];
				if (matchQuery(each, query)) {
					return each;
				}
			}

			return null;
		},

		sortByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return _.sortBy(array, keyPath);
			}
			return _.sortBy(array, function (it) {
				return _.valueForKeyPath(it, keyPath);
			});
		},

		groupByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return _.groupBy(array, keyPath);
			}
			return _.groupBy(array, function (it) {
				return _.valueForKeyPath(it, keyPath);
			});
		},

		indexByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return _.indexBy(array, keyPath);
			}
			return _.indexBy(array, function (it) {
				return _.valueForKeyPath(it, keyPath);
			});
		},

		countByKeyPath : function (array, keyPath) {
			"use strict";
			if (typeof keyPath !== "string") {
				return _.countBy(array, keyPath);
			}
			return _.countBy(array, function (it) {
				return _.valueForKeyPath(it, keyPath);
			});
		},

		hasKeyPath : function (obj, keyPath) {
			"use strict";
			var segments, last, target;
			if (obj === null || obj === undefined) {
				return false;
			}

			segments = toSegments(keyPath);
			last = segments.pop();
			target = _.valueForKeyPath(obj, segments);

			if (target !== null && target !== undefined) {
				return hasProperty(target, last);
			}

			return false;
		}

	};

	aliases = {
		"getValueForKeyPath" : mixins.valueForKeyPath
	};
	
	_.mixin(mixins);
	_.mixin(aliases);

	if (isNodeJS) {
		module.exports = _;
	}
}());

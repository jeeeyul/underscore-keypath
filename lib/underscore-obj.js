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

	_.mixin({
		valueForKeyPath : function(obj, keypath, fallback){
			var finger = obj;
			var segments = keypath.split(".");
			var next = segments.shift();

			while(finger !== null && finger !== undefined && next !== null && next !== undefined){
				finger = finger[next];
				next = segments.shift();
			}

			return finger || fallback;
		}
	});
	
	if(isNodeJS){
		module.exports = _;
	}
})();

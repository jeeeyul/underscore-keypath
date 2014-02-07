(function(){
	try{
		_;
	}catch(e){
		if(exports && require){
			_ = require("underscore");
		}
		else{
			throw new Error("Underscore is not found!");
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
	
	if(module && exports){
		module.exports = _;
	}
})();

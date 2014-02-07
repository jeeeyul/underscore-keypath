_.mixin({
	valueForKeyPath : function(obj, keypath, fallback){
		var finger = obj;
		var segments = keypath.split(".");
		var next = segments.shift();

		while(finger !== null && finger !== undefined){
			finger = finger[next];
			next = segments.shift();
		}

		return finger || fallback;
	}
});

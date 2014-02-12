Package.describe({
	summary : "Keypath mechanism for underscore"
});

Package.on_use(function(api, where){
	api.use("underscore", ["server", "client"]);

	api.add_files("lib/underscore-keypath.min.js", ["server", "client"]);
	api.add_files("export-underscore-keypath.js", ["server", "client"]);
});

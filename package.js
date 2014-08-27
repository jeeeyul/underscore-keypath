Package.describe({
	summary : "Keypath mechanism for underscore",
	git : "https://github.com/jeeeyul/underscore-keypath.git",
	version : "0.0.15"
});

Package.on_use(function (api) {
	api.use("underscore", ["server", "client"]);

	api.add_files("lib/underscore-keypath.min.js", ["server", "client"]);
	api.add_files("export-underscore-keypath.js", ["server", "client"]);
});

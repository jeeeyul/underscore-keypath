module.exports = function(grunt){
	grunt.initConfig({
		mochaTest: {
			testCases : ["test/*.js"],
			options : {
				reporter : "spec"
			}
		},

		jshint : {
			source : ["lib/underscore-keypath.js", "lib/export-underscore-keypath.j", "test/*.js"]
		},

		uglify: {
			options: {
				sourceMap : true,
				sourceMapName : function (path){
					return path + ".map";
				}
			},
			main : {
				files : {
					"lib/underscore-keypath.min.js" : "lib/underscore-keypath.js"
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-mocha-test");

	grunt.registerTask("default", ["jshint", "mochaTest:testCases"]);
	grunt.registerTask("minify", "uglify:main");
};

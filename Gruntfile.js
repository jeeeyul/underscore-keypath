module.exports = function(grunt){
	grunt.initConfig({
		mochaTest: {
			testCases : ["test/*.js"],
			options : {
				reporter : "spec"
			}
		},

		jshint : {
			source : ["lib/underscore-keypath.js", "test/*.js"]
		},

		uglify: {
			options: {
				sourceMap : function(filename){
					return filename + ".map";
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

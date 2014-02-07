var _ = require("../lib/underscore-keypath");
var assert = require("assert");

var foo = {
	"_version" : "0.0.1",
	"_valid" : true,
	"getVersion" : function(){
		return this._version;
	},
	"isValid" : function(){
		return this._valid;
	},

	"name" : "foo",
	"bar" : {
		"name" : "bar",
		"fnProp" : function(){
			return {
				name : "fnProp"
			}
		}
	}
}

describe("valueForKeyPath", function(){
	describe("empty-keypath", function(){
		it("what if keypath is empty, result must be current context", function(){
			assert.equal(
				_(foo).valueForKeyPath(""),
				foo
			);
		});
	});

	describe("fallback", function(){
		it("should return fallback value when there is no value for give keypath", function(){
			assert.equal(_(foo).valueForKeyPath("bar.nonexistproperty", "fallback"), "fallback");
		});
	});

	describe("function", function(){
		it("what if property is function, it's result have to be returned.", function(){
			assert.equal(
				_(foo).valueForKeyPath("bar.fnProp.name"),
				"fnProp"
			);
		});
	});

	describe("getter", function(){
		it("what if there is a getter for given key, it must be call", function(){
			assert.equal(
				_(foo).valueForKeyPath("version"),
				"0.0.1"
			);

			assert.equal(
				_(foo).valueForKeyPath("valid"),
				true
			);
		});
	});

});


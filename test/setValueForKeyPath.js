var _ = require("../lib/underscore-obj");
var assert = require("assert");

var foo = {
	"_version" : "0.0.1",
	"getVersion" : function(){
		return this._version;
	},
	"setVersion" : function(newVersion){
		this._version = newVersion;
	},

	"bar" : {
		"_name" : "bar",
		"setName" : function(newName){
			return this._name = newName;
		},
		"getName" : function(){
			return this._name;
		}
	}
}

describe("set plain property", function(){
	it("plain property must be updated", function(){
		_(foo).setValueForKeyPath("aProp", 1024);
		assert.equal(foo.aProp, 1024);

		_(foo).setValueForKeyPath("bar.bProp", 1111);
		assert.equal(foo.bar.bProp, 1111);
	});
});

describe("set property by setter", function(){
	it("what if there is setter for given keypath, it must be called", function(){
		_(foo).setValueForKeyPath("version", "9.9.9");
		assert.equal(foo._version, "9.9.9");

		_(foo).setValueForKeyPath("bar.name", "nodejs");
		assert.equal(foo.bar._name, "nodejs");
	});
});

var _ = require("../lib/underscore-obj");
var assert = require("assert");
var should = require("should");

var arr = [
	{
		"entry" : {
			"name" : "a",
			"tag" : "foo"
		}
	},
	{
		"entry" : {
			"name" : "b"
		}
	},
	{
		"entry" : {
			"name" : "c",
			"tag" : "foo"
		}
	}
];


describe("pluckByKeyPath", function(){
	it("pluckByKeyPath should have to pluck by keypath mechanism", function(){
		var actual = _(arr).pluckByKeyPath("entry.name");
		JSON.stringify(actual)
			.should.be.equal(JSON.stringify(["a", "b", "c"]));
	});
});

describe("whereByKeyPath", function(){
	it("whereByKeyPath should work as _.where with keypath", function(){
		var actual = _(arr).whereByKeyPath({
			"entry.tag" : "foo"
		});
		actual.should.have.lengthOf(2);
	});

	it("findWhereByKeyPath should work as _.findWhere with keypath", function(){
		_(arr).findWhereByKeyPath({
			"entry.tag" : "foo"
		}).entry.name.should.be.exactly("a");

		_(arr).findWhereByKeyPath({
			"entry.name" : "c"
		}).entry.name.should.be.exactly("c");
	});

});

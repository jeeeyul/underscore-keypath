var _ = require("../lib/underscore-keypath");
var assert = require("assert");
var should = require("should");

var arr = [
	{
		"entry" : {
			"name" : "a",
			"tag" : "foo",
			"age" : 1,
			"data" : [1, 3, 5, 7, 9]
		}
	},
	{
		"entry" : {
			"name" : "b",
			"age" : 2
		}
	},
	{
		"entry" : {
			"name" : "c",
			"tag" : "foo",
			"age" : 3
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


describe("@property", function(){
	it("@first should have to return first element", function(){
		_(arr).valueForKeyPath("@first.entry.name").should.be.exactly("a");
	});

	it("@last should have to return last element", function(){
		_(arr).valueForKeyPath("@last.entry.name").should.be.exactly("c");
	});

	it("@max should have to return max value of list", function(){
		_.chain(arr)
			.pluckByKeyPath("entry.age")
			.max()
			.value().should.be.exactly(3);

		_(arr).valueForKeyPath("@first.entry.data.@max").should.be.exactly(9);
	});

	it("@min should have to return min value of list", function(){
		_(arr).valueForKeyPath("@first.entry.data.@min").should.be.exactly(1);
	});

	it("@size should have to return size of list", function(){
		_(arr).valueForKeyPath("@size").should.be.exactly(3);
	});
});

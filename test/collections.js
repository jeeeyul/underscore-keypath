var _ = require("../lib/underscore-keypath");
var assert = require("assert");
var should = require("should");
var Person = require("./fixture").Person;

var fixture = [
	new Person("foo", 1),
	new Person("bar", 2),
	new Person("zar", 3)
];

describe("collection", function(){
	describe("pluckByKeyPath", function(){
		it("pluckByKeyPath should have to pluck by keypath mechanism", function(){
			_(fixture).pluckByKeyPath("name")
				.should.be.an.Array
				.and.containEql("foo")
				.and.containEql("bar")
				.and.containEql("zar")
				.and.have.lengthOf(3);
		});
	});

	describe("whereByKeyPath", function(){
		it("whereByKeyPath should act as where with key-value mechanism", function(){
			_(fixture).whereByKeyPath({
				"age" : 2
			}).should.be.an.Array
				.and.containEql(fixture[1])
				.and.have.lengthOf(1);
		});

		it("findWhere should act as _.findWhere with key-value mechanism", function(){
			_(fixture).findWhereByKeyPath({
				"age" : 1
			}).should.be.an.Object
				.and.be.exactly(fixture[0]);
		});
	});

	describe("@property", function(){
		_(fixture).valueForKeyPath("@first.name")
			.should.be.exactly("foo");

		_.chain(fixture)
			.pluckByKeyPath("age")
			.valueForKeyPath("@max")
			.value()
				.should.be.an.Number
				.and.be.exactly(3);

		_.chain(fixture)
			.pluckByKeyPath("age")
			.valueForKeyPath("@min")
			.value()
				.should.be.exactly(1);

		_(fixture).valueForKeyPath("@size")
			.should.be.exactly(3);

		_(fixture).valueForKeyPath("@first")
			.should.be.exactly(fixture[0]);

		_(fixture).valueForKeyPath("@last.name")
			.should.be.exactly("zar");
	});
});



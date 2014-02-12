var _ = require("../lib/underscore-keypath");
var assert = require("assert");
var should = require("should");
var Person = require("./fixture.js").Person;

describe("wrong", function(){
	it("it will be fail", function(){
		var fixture = { name : "aaa" };

		_(fixture).valueForKeyPath("name")
			.should.be.exactly("xxx");
	});
});

/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
require("should");
var Person = require("./fixture.js").Person;

describe("setValueForKeyPath", function () {
	var fixture;

	before(function () {
		fixture = {
			foo : new Person("foo", 1),
			bar : new Person("bar", 2)
		};
	});

	describe("set plain property", function () {
		it("plain property must be updated", function () {
			_(fixture).setValueForKeyPath("foo.alias", "FOO")
				.should.be.exactly("FOO");
			fixture.foo.alias.should.be.exactly("FOO");
		});

		it("keypath as an array", function () {
			_(fixture).setValueForKeyPath(["foo", "alias"], "FOO")
				.should.be.exactly("FOO");
			fixture.foo.alias.should.be.exactly("FOO");
		});
	});

	describe("set property by setter", function () {
		it("what if there is setter for given keypath, it must be called", function () {
			_(fixture).setValueForKeyPath("bar.age", 99)
				.should.be.exactly(99);
			fixture.bar._age.should.be.exactly(99);
		});

		it("key path as an array", function () {
			_(fixture).setValueForKeyPath(["bar", "age"], 99)
				.should.be.exactly(99);
			fixture.bar._age.should.be.exactly(99);
		});
	});

  describe("set property when target missing", function () {
		it("new path two deep must work", function () {
			_(fixture).setValueForKeyPath("a.b", 2)
				.should.be.exactly(2);
			fixture.a.b.should.be.exactly(2);
		});

		it("new path three deep must work", function () {
			_(fixture).setValueForKeyPath("c.d.e", 3)
				.should.be.exactly(3);
			fixture.c.d.e.should.be.exactly(3);
		});

		it("new path four deep must work", function () {
			_(fixture).setValueForKeyPath("f.g.h.i", 4)
				.should.be.exactly(4);
			fixture.f.g.h.i.should.be.exactly(4);
		});

		it("new path three deep, down one must work", function () {
			_(fixture).setValueForKeyPath("a.m.x", 5);
			_(fixture).setValueForKeyPath("a.m.n.o", 5)
				.should.be.exactly(5);
			fixture.a.m.n.o.should.be.exactly(5);
		});

		it("new path three deep, down two must work", function () {
			_(fixture).setValueForKeyPath("a.m.p.x", 5);
			_(fixture).setValueForKeyPath("a.m.p.q.r", 6)
				.should.be.exactly(6);
			fixture.a.m.p.q.r.should.be.exactly(6);
		});

	});

  
});

/* globals it:false, describe:false, it:false */
var _ = require("../lib/underscore-keypath");
require("should");

describe("issue1", function () {
	var foo = {
		bar : {
			id: 0,
			name : "foo"
		}
	};

	it("zero value test", function () {
		_(foo).valueForKeyPath("bar.id")
		.should.be.exactly(0);
	});
});

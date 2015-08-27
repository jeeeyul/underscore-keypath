/* globals it:false, describe:false, it:false, before:false */
var _ = require("../lib/underscore-keypath");
require("should");
var fixture = [];

describe("tap-keypath", function () {
	before(function () {
		fixture = [
			{
				company : {
					name : "AAA",
					since : 1995
				}
			},
			{
				company : {
					name : "BBB",
					since : 1990
				}
			},
			{
				company : {
					name : "AAA",
					since : 1998
				}
			}
		];
	});

	it("1", function () {
		var total = 0;
		function adder(value) {
			total += value;
		}
		_.chain(fixture)
			.eachByKeyPath("company.since", adder);


		total.should.be.exactly(1995 + 1990 + 1998);
	});
});

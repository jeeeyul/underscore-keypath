var _ = require("./underscore-obj");

var o = {
	name : "x",
	wife : {
		name : "ame"
	}
};

console.log(_(o).valueForKeyPath("wife.name"));

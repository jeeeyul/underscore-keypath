var _ = require("underscore");

function Person(name, age, options){
	this._name = name;
	this._age = age;
	this._male = true;
	this.options = _.extend({}, options);
};

Person.prototype.getName = function(){
	return this._name;
};

Person.prototype.setName = function(newName){
	return this._name = newName;
};

Person.prototype.getAge = function(){
	return this._age;
};

Person.prototype.setAge = function(newAge){
	return this._age = newAge;
};

Person.prototype.isMale = function(){
	return this._male;
};

Person.prototype.setMail = function(newMale){
	return this._male = newMale;
};

exports.Person = Person;

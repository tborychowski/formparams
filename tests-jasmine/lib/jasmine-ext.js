/*global jasmine*/
jasmine.Matchers.prototype.toBeA = function (expected) {
	var actual, notText, objType;
	actual = this.actual;
	notText = this.isNot ? 'not ' : '';
	objType = actual ? Object.prototype.toString.call(actual) : '';
	this.message = function () { return 'Expected ' + actual + notText + ' to be a ' + expected; };
	if (expected === 'undefined') return objType === '';
	return objType.toLowerCase() === '[object ' + expected.toLowerCase() + ']';
};

jasmine.Matchers.prototype.toBeAn = function (expected) {
	var actual, notText, objType;
	actual = this.actual;
	notText = this.isNot ? 'not ' : '';
	objType = actual ? Object.prototype.toString.call(actual) : '';
	this.message = function () { return 'Expected ' + actual + notText + ' to be an ' + expected; };
	if (expected === 'undefined') return objType === '';
	return objType.toLowerCase() === '[object ' + expected.toLowerCase() + ']';
};

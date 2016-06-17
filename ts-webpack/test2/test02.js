// CRISTIAN ECHEVERRÍA RABÍ

var cx = require('../out/cx.min.js');
var assert = require('assert');

console.log(cx.TC_MAX);
console.log(cx.CC_CUWELD.idx);
console.log(cx.Conductor);

var lb = [1, 3 , 4.6, 5];

try {
    cx.check(4.61).gt(0).lt(100).isIn(lb);
} catch(err) {
    console.log(err.name);
    console.log(err.message);
}

assert.throws(
	function() {
		cx.check(1/0).isFinite();
	},
	RangeError
);

assert.equal(1,1);

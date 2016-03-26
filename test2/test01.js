// CRISTIAN ECHEVERRÍA RABÍ

//var cx = require('../dist/cx');
var cx = require('../dist/cx.br');

console.log(cx.TC_MAX);
console.log(cx.CC_CUWELD.idx);


var lb = [1, 3 , 4.6, 5];

try {
    cx.check(4.61).gt(0).lt(100).isIn(lb);
} catch(err) {
    console.log(err.name);
    console.log(err.message);
}

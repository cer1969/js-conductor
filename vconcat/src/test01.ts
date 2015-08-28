// CRISTIAN ECHEVERRÍA RABÍ

import cx = require('./cx');
import k = require('./constants');
import cat = require('./category');
import check = require('./checker');

console.log(cx.TC_MAX);
console.log(k.TC_MAX);
console.log(cat.CC_CUWELD.idx);


var lb = [1, 3 , 4.6, 5];

try {
    check.check(4.61).gt(0).lt(100).isIn(lb);
} catch(err) {
    console.log(err.name);
    console.log(err.message);
}
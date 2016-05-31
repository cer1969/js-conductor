// CRISTIAN ECHEVERRÍA RABÍ

var cx = require('../vmodule/out/cx.min.js');
//var cx = require('../dist/cx');
//var cx = require('../dist/cx.br');

var cu300 = new cx.Conductor("CU 300 MCM", cx.CC_CU, 15.95, 152.00, 1.378, 6123.0, 0.12270, 0, "");
var cc = new cx.CurrentCalc(cu300);

//cc.deltaTemp = 0

var current;
var txt;

var tas = [10, 15, 20, 25, 30];
var tcs = [30, 35, 40, 45, 50];

var t1 = new Date().getTime();
for (var i = 0; i < tas.length; i++) {
    for (var j = 0; j < tcs.length; j++) {
        current = cc.getCurrent(tas[i], tcs[j]);
        txt = `i=${i}, j=${j}, Ta=${tas[i].toFixed(2)}, Tc=${tcs[j].toFixed(2)}, I=${current.toFixed(2)}`;
        console.log(txt);
    }
}
var t2 = new Date().getTime();
console.log(t2-t1);

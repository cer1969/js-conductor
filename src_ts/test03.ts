// CRISTIAN ECHEVERRÍA RABÍ

import cx = require('./cx');


var cu300 = new cx.Conductor("CU 300 MCM", cx.CC_CU, 15.95, 152.00, 1.378, 6123.0, 0.12270, 0, "");
var cc = new cx.CurrentCalc(cu300);

//cc.deltaTemp = 0

var current: number;
var txt: string;

[10, 15, 20, 25, 30].forEach(function (va, i, myarr1) {
    [30, 35, 40, 45, 50].forEach(function (vc, j, myarr2) {
        current = cc.getCurrent(va, vc);
        txt = `i=${i}, j=${j}, Ta=${va.toFixed(2)}, Tc=${vc.toFixed(2)}, I=${current.toFixed(2)}`;
        console.log(txt);
    });
});


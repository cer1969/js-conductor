// CRISTIAN ECHEVERRÍA RABÍ

import checker = require('./checker');
import k = require('./constants');
import cat = require('./category');
import cond = require('./conductor');
import ccalc = require('./currentcalc');

//----------------------------------------------------------------------------------------
// Re-export check

export var check = checker;

//----------------------------------------------------------------------------------------
// Re-export constants

export var CF_CLASSIC = k.CF_CLASSIC;
export var CF_IEEE = k.CF_IEEE;
export var TA_MIN = k.TA_MIN;
export var TA_MAX =  k.TA_MAX;
export var TC_MIN = k.TC_MIN;
export var TC_MAX = k.TC_MAX;
export var ITER_MAX = k.ITER_MAX;
export var TENSION_MAX = k.TENSION_MAX;

//----------------------------------------------------------------------------------------
// Re-export Category

export var Category = cat.Category;
export var CC_CU = cat.CC_CU;
export var CC_AAAC = cat.CC_AAAC;
export var CC_ACAR = cat.CC_ACAR;
export var CC_ACSR = cat.CC_ACSR;
export var CC_AAC = cat.CC_AAC;
export var CC_CUWELD = cat.CC_CUWELD;
export var CC_AASC = cat.CC_AASC;
export var CC_ALL = cat.CC_ALL;

//----------------------------------------------------------------------------------------
// Re-export Conductor

export var Conductor = cond.Conductor;

//----------------------------------------------------------------------------------------
// Re-export CurrentCalc

export var CurrentCalc = ccalc.CurrentCalc;
//----------------------------------------------------------------------------------------
// constants.js

/*
Define constants for js.conductor

Formula to use in CurrentCalc for current calculations
CF_CLASSIC = "CLASSIC"    Identifies CLASSIC formula
CF_IEEE   = "IEEE"      Identifies IEEE formula

Ambient temperature in °C
TA_MIN = -90    Minimum value for ambient temperature
                World lowest -82.2°C Vostok Antartica 21/07/1983
TA_MAX =  90    Maximum value for ambient temperature
                World highest 58.2°C Libia 13/09/1922

Conductor temperature [°C]
TC_MIN =  -90    Minimum value for conductor temperature
TC_MAX = 2000    Maximum value for conductor temperature = 2000°C
                 Copper melt at 1083 °C

Iterations
ITER_MAX = 20000    Maximum iterations number = 20000

Conductor tension [kg]
TENSION_MAX = 50000    Maximum conductor tension
*/

// Current calculus formulas
const CF_CLASSIC = "CLASSIC";
const CF_IEEE   = "IEEE";

// Ambient temperature
const TA_MIN = -90.0;
const TA_MAX =  90.0;

// Conductor temperature
const TC_MIN =  -90.0;
const TC_MAX = 2000.0;

// Iterations
const ITER_MAX = 20000;

// Conductor tension
const TENSION_MAX = 50000;

//----------------------------------------------------------------------------------------
// exports

exports.CF_CLASSIC 		= CF_CLASSIC;
exports.CF_IEEE 		= CF_IEEE;
exports.TA_MIN 			= TA_MIN;
exports.TA_MAX 			= TA_MAX;
exports.TC_MIN 			= TC_MIN;
exports.TC_MAX 			= TC_MAX;
exports.ITER_MAX 		= ITER_MAX;
exports.TENSION_MAX 	= TENSION_MAX;

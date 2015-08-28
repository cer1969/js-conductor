// CRISTIAN ECHEVERRÍA RABÍ
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

//----------------------------------------------------------------------------------------

// Current calculus formulas
export var CF_CLASSIC: string = "CLASSIC";
export var CF_IEEE: string   = "IEEE";

// Ambient temperature
export var TA_MIN: number = -90.0;
export var TA_MAX: number =  90.0;

// Conductor temperature
export var TC_MIN: number =  -90.0;
export var TC_MAX: number = 2000.0;

// Iterations
export var ITER_MAX: number = 20000;

// Conductor tension
export var TENSION_MAX: number = 50000;
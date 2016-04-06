// CRISTIAN ECHEVERRÍA RABÍ

//----------------------------------------------------------------------------------------
// checker.ts

// Comparison functions

function _lt(a, b): boolean {return a < b;}
function _le(a, b): boolean {return a <= b;}
function _ge(a, b): boolean {return a >= b;}
function _gt(a, b): boolean {return a > b;}

function _isIn(a, blist): boolean {
    if (blist.indexOf(a) != -1) {
        return true;
    }
    return false;
}

// Check class

export class _Check {
    /*
    Class for value testing with error raising
    */
    constructor(public value) {}
    
    _compare(compFunc, txte: string, limit) {
        if (!compFunc(this.value, limit)) {
            let txt = `Required value ${txte} ${limit} (${this.value} entered)`;
            throw new RangeError(txt);
        }
        return this;
    }
    
    lt(limit) {return this._compare(_lt, "<", limit);}
    le(limit) {return this._compare(_le, "<=", limit);}
    gt(limit) {return this._compare(_gt, ">", limit);}
    ge(limit) {return this._compare(_ge, ">=", limit);}
    isIn(blist) {return this._compare(_isIn, "in", blist);}
    
    isFinite() {
    	if (!isFinite(this.value)) {
    		let txt = `Number expected (${this.value} entered)`;
            throw new RangeError(txt);
    	}
    	return this;
    }
}

// Public function check

export function check(value) {return new _Check(value)}

//----------------------------------------------------------------------------------------
// constants.ts

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
export const CF_CLASSIC: string = "CLASSIC";
export const CF_IEEE: string   = "IEEE";

// Ambient temperature
export const TA_MIN: number = -90.0;
export const TA_MAX: number =  90.0;

// Conductor temperature
export const TC_MIN: number =  -90.0;
export const TC_MAX: number = 2000.0;

// Iterations
export const ITER_MAX: number = 20000;

// Conductor tension
export const TENSION_MAX: number = 50000;

//----------------------------------------------------------------------------------------
// category.ts

export class Category {
    /*
    Represents a category of conductors with similar characteristics
    name    : Name of conductor category
    modelas : Modulus of elasticity [kg/mm2]
    coefexp : Coefficient of Thermal Expansion [1/°C]
    creep   : Creep [°C]
    alpha   : Temperature coefficient of resistance [1/°C]
    idx     : Database key
    */
    constructor(public name: string, public modelas: number, public coefexp: number, 
                public creep: number, public alpha: number, public idx?: string) {}
}

// Category instances to use as constants

export const CC_CU: Category     = new Category('COPPER',      12000.0, 0.0000169,  0.0, 0.00374, 'CU');
export const CC_AAAC: Category   = new Category('AAAC (AASC)',  6450.0, 0.0000230, 20.0, 0.00340, 'AAAC');
export const CC_ACAR: Category   = new Category('ACAR',         6450.0, 0.0000250, 20.0, 0.00385, 'ACAR');
export const CC_ACSR: Category   = new Category('ACSR',         8000.0, 0.0000191, 20.0, 0.00395, 'ACSR');
export const CC_AAC: Category    = new Category('ALUMINUM',     5600.0, 0.0000230, 20.0, 0.00395, 'AAC');
export const CC_CUWELD: Category = new Category('COPPERWELD',  16200.0, 0.0000130,  0.0, 0.00380, 'CUWELD');
export const CC_AASC: Category   = CC_AAAC;
export const CC_ALL: Category    = CC_AAC;

//----------------------------------------------------------------------------------------
// conductor.ts

export class Conductor {
    /*
    Container for conductor characteristics
    name     : Name of conductor
    category : Category instance
    diameter : Diameter [mm]
    area     : Cross section area [mm2]
    weight   : Weight per unit [kg/m]
    strength : Rated strength [kg]
    r25      : Resistance at 25°C [Ohm/km]
    hcap     : Heat capacity [kcal/(ft*°C)]
    idx      : Database key
    */
    constructor(public name: string, public category: Category, public diameter: number, 
                public area: number, public weight: number, public strength: number,
                public r25: number, public hcap: number, public idx?: string) {}
}

//----------------------------------------------------------------------------------------
// currentcalc.ts

export class CurrentCalc {
    /*
    Object to calculate conductor current and temperatures.

    Read-only properties
    conductor  : Conductor instance

    Read-write properties
    altitude    : Altitude [m] = 300.0
    airVelocity : Velocity of air stream [ft/seg] =   2.0
    sunEffect   : Sun effect factor (0 to 1) = 1.0
    emissivity  : Emissivity (0 to 1) = 0.5
    formula     : Define formula for current calculation = CF_IEEE
    deltaTemp   : Temperature difference to determine equality [°C] = 0.0001
    */
    private _conductor;
    private _altitude = 300.0;
    private _airVelocity = 2.0;
    private _sunEffect = 1.0;
    private _emissivity = 0.5;
    private _formula = CF_IEEE;
    private _deltaTemp = 0.0001;

    constructor(conductor: Conductor) {
        /*
        conductor : Conductor instance.
        Valid values are required for r25, diameter and category.alpha
        */
        check(conductor.r25).gt(0);
        check(conductor.diameter).gt(0);
        check(conductor.category.alpha).gt(0).lt(1);

        this._conductor = conductor;
    }

    // Public methods

    getResistance(tc:number): number {
        /*
        Returns resistance [Ohm/km]
        tc : Conductor temperature [°C]
        */
        check(tc).ge(TC_MIN).le(TC_MAX);
        return this._conductor.r25*(1 + this._conductor.category.alpha*(tc - 25));
    }

    getCurrent(ta: number, tc:number): number {
        /*
        Returns current [ampere]
        ta : Ambient temperature [°C]
        tc : Conductor temperature [°C]
        */
        check(ta).ge(TA_MIN).le(TA_MAX);
        check(tc).ge(TC_MIN).le(TC_MAX);

        if (ta >= tc) {
            return 0.0;
        }

        let D = this._conductor.diameter/25.4;                                  // Diámetro en pulgadas
        let Pb = Math.pow(10, 1.880813592 - this._altitude/18336);              // Presión barométrica en cmHg
        let V = this._airVelocity*3600;                                         // Vel. viento en pies/hora
        let Rc = this.getResistance(tc)*0.0003048;                              // Resistencia en ohm/pies
        let Tm = 0.5*(tc + ta);                                                 // Temperatura media
        let Rf = 0.2901577*Pb/(273 + Tm);                                       // Densidad rel.aire ¿lb/ft^3?
        let Uf = 0.04165 + 0.000111*Tm;                                         // Viscosidad abs. aire ¿lb/(ft x hora)
        let Kf = 0.00739 + 0.0000227*Tm;                                        // Coef. conductividad term. aire [Watt/(ft x °C)]
        let Qc = 0.283*Math.sqrt(Rf)*Math.pow(D, 0.75)*Math.pow(tc - ta, 1.25); // watt/ft

        if (V != 0) {
            let factor = D*Rf*V/Uf;
            let Qc1 = 0.1695*Kf*(tc - ta)*Math.pow(factor, 0.6);
            let Qc2 = Kf*(tc - ta)*(1.01 + 0.371*Math.pow(factor, 0.52));
            if (this._formula == CF_IEEE) {    // IEEE criteria
                Qc = Math.max(Qc, Qc1, Qc2);
            } else {                             // CLASSIC criteria
                if (factor < 12000) {
                    Qc = Qc2;
                } else {
                    Qc = Qc1;
                }
            }
        }
        let LK = Math.pow((tc + 273)/100, 4);
        let MK = Math.pow((ta + 273)/100, 4);
        let Qr = 0.138*D*this._emissivity*(LK - MK);
        let Qs = 3.87*D*this._sunEffect;

        if ((Qc + Qr) < Qs) {
            return 0.0;
        } else {
            return Math.sqrt((Qc + Qr - Qs)/Rc);
        }
    }

    getTc(ta: number, ic: number): number {
        /*
        Returns conductor temperature [ampere]
        ta : Ambient temperature [°C]
        ic : Current [ampere]
        */
        check(ta).ge(TA_MIN).le(TA_MAX);
        let _Imin = 0;
        let _Imax = this.getCurrent(ta, TC_MAX);
        check(ic).ge(_Imin).le(_Imax);   // Ensure ta <= Tc <= TC_MAX

        let Tmin = ta;
        let Tmax = TC_MAX;
        let cuenta = 0;
        let Tmed: number;
        let Imed: number;
        while ((Tmax - Tmin) > this._deltaTemp) {
            Tmed = 0.5*(Tmin + Tmax);
            Imed = this.getCurrent(ta, Tmed);
            if (Imed > ic) {
                Tmax = Tmed
            } else {
                Tmin = Tmed
            }
            cuenta = cuenta + 1;
            if (cuenta > ITER_MAX) {
                let err_msg = `getTc(): N° iterations > ${ITER_MAX}`;
                throw new RangeError(err_msg);
            }
        }
        return Tmed;
    }

    getTa(tc: number, ic: number): number {
        /*
        Returns ambient temperature [ampere]
        tc : Conductor temperature [°C]
        ic : Current [ampere]
        */
        check(tc).ge(TC_MIN).le(TC_MAX);

        let _Imin = this.getCurrent(TA_MAX, tc);
        let _Imax = this.getCurrent(TA_MIN, tc);
        check(ic).ge(_Imin).le(_Imax);  // Ensure TA_MIN =< Ta =< TA_MAX

        let Tmin = TA_MIN;
        let Tmax = Math.min(TA_MAX, tc);
        if (Tmin >= Tmax) {
            return tc;
        }

        let cuenta = 0;
        let Tmed: number;
        let Imed: number;
        while ((Tmax - Tmin) > this._deltaTemp) {
            Tmed = 0.5*(Tmin + Tmax);
            Imed = this.getCurrent(Tmed, tc);
            if (Imed > ic) {
                Tmin = Tmed;
            } else {
                Tmax = Tmed;
            }
            cuenta = cuenta + 1;
            if (cuenta > ITER_MAX) {
                let err_msg = `getTa(): N° iterations > ${ITER_MAX}`;
                throw new RangeError(err_msg);
            }
        }
        return Tmed;
    }

    // Propiedades

    get conductor() {
        return this._conductor;
    }

    set conductor(value) {
    	throw new RangeError('CurrentCalc.conductor is readonly');
    }

    get altitude(): number {
        return this._altitude;/// <reference path="./constants.ts"/>
    }

    set altitude(value: number) {
        check(value).ge(0);
        this._altitude = value;
    }

    get airVelocity(): number {
        return this._airVelocity;
    }

    set airVelocity(value: number) {
        check(value).ge(0);
        this._airVelocity = value;
    }

    get sunEffect(): number {
        return this._sunEffect;
    }

    set sunEffect(value: number) {
        check(value).ge(0).le(1);
        this._sunEffect = value;
    }

    get emissivity(): number {
        return this._emissivity;
    }

    set emissivity(value: number) {
        check(value).ge(0).le(1);
        this._emissivity = value;
    }

    get formula(): string {
        return this._formula;
    }

    set formula(value: string) {
        check(value).isIn([CF_CLASSIC, CF_IEEE]);
        this._formula = value;
    }

    get deltaTemp(): number {
        return this._deltaTemp;
    }

    set deltaTemp(value: number) {
        check(value).gt(0);
        this._deltaTemp = value;
    }

}

//----------------------------------------------------------------------------------------
// operatingtable.ts

export class OperatingItem {
    /*
    Container for conductor and operating conditions
    
    Read-only properties
    currentcalc : CurrentCalc instance
    tempMaxOp   : Maximux operating temperature for currentcalc.conductor [°C]
    nsc         : Number of subconductor per fase
    */
    private _currentcalc;
    private _tempMaxOp;
    private _nsc;
    
    constructor(currentcalc: CurrentCalc, tempMaxOp=50.0, nsc=1, altitude=300.0, emissivity=0.5) {
        currentcalc.altitude = altitude;
        currentcalc.emissivity = emissivity;
        check(tempMaxOp).ge(TC_MIN).le(TC_MAX);
        check(nsc).ge(1);
        
        this._currentcalc = currentcalc;
        this._tempMaxOp = tempMaxOp;
        this._nsc = nsc;
    }
}
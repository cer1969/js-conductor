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

//----------------------------------------------------------------------------------------
// category.js

class Category {
    /*
    Represents a category of conductors with similar characteristics
    name    : Name of conductor category					string
    modelas : Modulus of elasticity [kg/mm2]				number
    coefexp : Coefficient of Thermal Expansion [1/°C]		number
    creep   : Creep [°C]									number
    alpha   : Temperature coefficient of resistance [1/°C]	number
    idx     : Database key									string
    */
    constructor(name, modelas, coefexp, creep, alpha, idx) {
		this.name = name;
		this.modelas = modelas;
		this.coefexp = coefexp;
		this.creep = creep;
		this.alpha = alpha;
		this.idx = idx;
	}
}

// Category instances to use as constants

const CC_CU		= new Category('COPPER',      12000.0, 0.0000169,  0.0, 0.00374, 'CU');
const CC_AAAC		= new Category('AAAC (AASC)',  6450.0, 0.0000230, 20.0, 0.00340, 'AAAC');
const CC_ACAR		= new Category('ACAR',         6450.0, 0.0000250, 20.0, 0.00385, 'ACAR');
const CC_ACSR		= new Category('ACSR',         8000.0, 0.0000191, 20.0, 0.00395, 'ACSR');
const CC_AAC		= new Category('ALUMINUM',     5600.0, 0.0000230, 20.0, 0.00395, 'AAC');
const CC_CUWELD	= new Category('COPPERWELD',  16200.0, 0.0000130,  0.0, 0.00380, 'CUWELD');
const CC_AASC 		= CC_AAAC;
const CC_ALL 		= CC_AAC

//----------------------------------------------------------------------------------------
// exports

exports.Category 	= Category;
exports.CC_CU		= CC_CU
exports.CC_AAAC		= CC_AAAC
exports.CC_ACAR		= CC_ACAR
exports.CC_ACSR		= CC_ACSR
exports.CC_AAC		= CC_AAC
exports.CC_CUWELD	= CC_CUWELD
exports.CC_AASC 	= CC_AASC
exports.CC_ALL 		= CC_ALL

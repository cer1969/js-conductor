// CRISTIAN ECHEVERRÍA RABÍ

//----------------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------------
// Check class

class Check {
    /*
    Class for value testing with error raising
    */
    
    //private txtMessage: string = `Required value ${txte} ${limit} (${value} entered)`
    constructor(public value) {}
    
    _compare(compFunc, txte: string, limit) {
        if (!compFunc(this.value, limit)) {
            var txt: string = `Required value ${txte} ${limit} (${this.value} entered)`;
            throw new RangeError(txt);
        }
        return this
    }
    
    lt(limit) {return this._compare(_lt, "<", limit);}
    le(limit) {return this._compare(_le, "<=", limit);}
    gt(limit) {return this._compare(_gt, ">", limit);}
    ge(limit) {return this._compare(_ge, ">=", limit);}
    isIn(blist) {return this._compare(_isIn, "in", blist);}
}

//----------------------------------------------------------------------------------------
// Public function check

function check(value) {return new Check(value)}

export = check;
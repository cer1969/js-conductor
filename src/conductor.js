//----------------------------------------------------------------------------------------
// conductor.js

class Conductor {
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
    constructor(name, category, diameter, area, weight, strength, r25, hcap, idx) {
		this.name = name;
		this.category = category;
		this.diameter = diameter;
		this.area = area;
		this.weight = weight;
		this.strength = strength;
		this.r25 = r25;
		this.hcap = hcap;
		this.idx = idx;
		
	}
}

//----------------------------------------------------------------------------------------
// exports

exports.Conductor = Conductor;

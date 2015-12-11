'use strict';
/**
 * Describes one geolocated spot
 * @class {Spot}
 */
class Spot {

    constructor(latitude, longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}
}
module.exports = Spot;
'use strict';
/**
 * Describes a BusStop instance
 * @class {BusStop}
 */
class BusStop {
	
	constructor(line, description, agency, spots) {
		this.line = (!line || line==='')? 'indefinido' : line.toString();
		this.description = (!description || description==='')? 'desconhecido' : description;
		this.agency = agency || '';
		this.spots = spots || [];
	}
}
module.exports = BusStop;
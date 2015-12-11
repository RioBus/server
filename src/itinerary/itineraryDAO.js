'use strict';
/* global database; */

class ItineraryDAO {
	
	constructor(connection) {
		if(!connection) connection = database;
		this.collection = connection.collection('itinerary');
	}
	
	getHeaders() {
		return this.collection.find({}, { fields: ['line', 'description'], sort: { line: 1 } });
	}
	
	getByKeyword(keyword){
		return this.collection.find({keywords: new RegExp(keyword) });
	}
	
	getByLine(line){
		return this.collection.findOne({line:line});
	}
}
module.exports = ItineraryDAO;
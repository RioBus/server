'use strict';
const wrap = require('co-express');
const Core = require('../core');
const Database = Core.Database;
const Bus = require('./busModel');
const BusDAO = require('./busDAO');
const ItineraryDAO = require('../itinerary/itineraryDAO');

class BusResource {

	get base() { return '/v3/search'; }
	
	constructor(router) {
		router.get('/:data', wrap(this.getBuses));
	}

	*getBuses(request, response) {
		const dao = new BusDAO();
		const searchTerm = request.params.data;
		let data = yield dao.getByLines(searchTerm.split(','));
		if(data.length>0) response.jsonp(data);
		else {
			data = yield dao.getByOrders(searchTerm.split(','));
			if(data.length>0) response.jsonp(data);
			else {
				let itineraryDao = new ItineraryDAO();
				let lines = (yield itineraryDao.getByKeyword(searchTerm)).map((itinerary) => { return itinerary.line; });
				data = yield dao.getByLines(lines);
				if(data.length>0) response.status(200).jsonp(data);
				else response.status(404).jsonp([]);
			}
		}	
	}
}
module.exports = BusResource;
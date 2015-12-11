'use strict';
const wrap = require('co-express');
const Core = require('../core');
const Database = Core.Database;
const Itinerary = require('./itineraryModel');
const ItineraryDAO = require('./itineraryDAO');

class ItineraryResource {

	get base() { return '/v3/itinerary'; }
	
	constructor(router) {
		router.get('/', wrap(this.getMainRoute));
		router.get('/:line', wrap(this.getByLine));
	}

	*getMainRoute(request, response) {
		const dao = new ItineraryDAO();
		const data = yield dao.getHeaders();
		response.jsonp(data);	
	}

	*getByLine(request, response) {
		const dao = new ItineraryDAO();
		const data = yield dao.getByLine(request.params.line);
		response.jsonp(data);	
	}
}
module.exports = ItineraryResource;
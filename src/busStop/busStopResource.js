'use strict';
const wrap = require('co-express');
const Core = require('../core');
const Database = Core.Database;
const BusStop = require('./busStopModel');
const BusStopDAO = require('./busStopDAO');

class BusStopResource {

	get base() { return '/v3/busstop'; }
	
	constructor(router) {
		router.get('/:line', wrap(this.getByLine));
	}

	*getByLine(request, response) {
		const dao = new BusStopDAO();
		const data = yield dao.getByLine(request.params.line);
		response.jsonp(data);	
	}
}
module.exports = BusStopResource;
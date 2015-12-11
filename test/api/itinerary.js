'use strict';
/* global describe, it, after, before, __dirname, global; */
const base = `${__dirname}/../../src`;

const Assert    = require('assert');
const Config    = require(`${base}/config`);
const Core      = require(`${base}/core`);
const Database  = Core.Database;
const Http	    = Core.Http;
const Router    = Core.Router;
const Itinerary = require(`${base}/itinerary/itineraryModel`);

describe('Itinerary API', () => {
	
	let server, host;
	
	before(function*() {
		let ip = '0.0.0.0', port = 8080;
		host = `http://${ip}:${port}`;
		
		global.database = yield Database.connect();
		yield global.database.collection('itinerary').insert(new Itinerary('lineCode', 'description', 'agency', 'keywords', []));
		
		let router = new Router();
		router.registerResources(Config.resources);
		server = router.start(ip, port);
	});
	
	it('should get a list with all itineraries by doing a GET request to /v3/itinerary', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/itinerary`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.length, 1);
			Assert.equal(data[0].line, 'lineCode');
			Assert.equal(data[0].description, 'description');
			Assert.equal(data[0].agency, undefined);
			Assert.equal(data[0].keywords, undefined);
			Assert.equal(data[0].spots, undefined);
		}
	});
	
	it('should get a single itinerary by doing a GET request to /v3/itinerary/lineCode', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/itinerary/lineCode`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data.line, 'lineCode');
			Assert.equal(data.description, 'description');
			Assert.equal(data.agency, 'agency');
			Assert.equal(data.keywords, 'keywords');
		}
	});
	
	after(function*() {
		server.close();
		yield global.database.collection('itinerary').remove({});
	});
});
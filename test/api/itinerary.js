'use strict';
/* global describe, it, after, before, __dirname, global; */
const base = `${__dirname}/../../src`;

const Assert       = require('assert');
const Core         = require(`${base}/core`);
const Database	   = Core.Database;
const Http	       = Core.Http;
const Router       = Core.Router;

const Itinerary    = require(`${base}/itinerary/itineraryModel`);

describe('Itinerary API', () => {
	
	before(function*() {
		global.connection = yield Database.connect();
		yield global.connection.collection('itinerary').insert(new Itinerary('lineCode', 'description', 'agency', 'keywords', []));
		
		let router = new Router();
		router.registerResources(['itinerary/itineraryResource']);
		router.start('0.0.0.0', 8080);
	});
	
	it('should get a list with all itineraries by doing a GET request to /v3/itinerary', function*() {
		let data;
		try {
			var output = yield Http.get('http://localhost:8080/v3/itinerary');
			data = JSON.parse(output);
		} catch(e) {
			data = e;
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.length, 1);
			Assert.equal(data[0].line, 'lineCode');
			Assert.equal(data[0].description, 'description');
		}
	});
	
	it('should get a single itinerary by doing a GET request to /v3/itinerary/lineCode', function*() {
		let data;
		try {
			var output = yield Http.get('http://localhost:8080/v3/itinerary/lineCode');
			data = JSON.parse(output);
		} catch(e) {
			data = e;
		} finally {
			Assert.equal(data.line, 'lineCode');
			Assert.equal(data.description, 'description');
			Assert.equal(data.agency, 'agency');
			Assert.equal(data.keywords, 'keywords');
		}
	});
	
	after(function*() {
		yield global.connection.collection('itinerary').remove({});
	});
});
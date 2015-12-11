'use strict';
/* global describe, it, after, before, __dirname, global; */
const base = `${__dirname}/../../src`;

const Assert    = require('assert');
const Config    = require(`${base}/config`);
const Core      = require(`${base}/core`);
const Database  = Core.Database;
const Http	    = Core.Http;
const Router    = Core.Router;
const Bus       = require(`${base}/bus/busModel`);
const Itinerary = require(`${base}/itinerary/itineraryModel`);

describe('Bus API', () => {
	
	let server, host;
	
	before(function*() {
		let ip = '0.0.0.0', port = 8080;
		host = `http://${ip}:${port}`;
		
		global.database = yield Database.connect();
		yield global.database.collection('bus').insert(new Bus('485', 'order', 0, 0, 20, 30, (new Date()).toDateString(), 'sense'));
		yield global.database.collection('itinerary').insert(new Itinerary('485', 'sense', '', '485 sense', []));
		
		let router = new Router();
		router.registerResources(Config.resources);
		server = router.start(ip, port);
	});
	
	it('should get a list of all buses from a GET request to /v3/search/485', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/485`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.length, 1);
			Assert.equal(data[0].line, '485');
			Assert.equal(data[0].order, 'order');
			Assert.equal(data[0].speed, 0);
			Assert.equal(data[0].direction, 0);
			Assert.equal(data[0].sense, 'sense');
		}
	});
	
	it('should get a list with only one bus from a GET request to /v3/search/order', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/order`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.length, 1);
			Assert.equal(data[0].line, '485');
			Assert.equal(data[0].order, 'order');
			Assert.equal(data[0].speed, 0);
			Assert.equal(data[0].direction, 0);
			Assert.equal(data[0].sense, 'sense');
		}
	});
	
	it('should get a list with only one bus from a GET request to v3/search/sense', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/sense`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.length, 1);
			Assert.equal(data[0].line, '485');
			Assert.equal(data[0].order, 'order');
			Assert.equal(data[0].speed, 0);
			Assert.equal(data[0].direction, 0);
			Assert.equal(data[0].sense, 'sense');
		}
	});
	
	it('should get an empty list from a GET request to v3/search/unexisting', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/search/unexisting`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.length, 0);
		}
	});
	
	after(function*() {
		server.close();
		yield global.database.collection('bus').remove({});
		yield global.database.collection('itinerary').remove({});
	});
});
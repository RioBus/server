'use strict';
/* global describe, it, after, before, __dirname, global; */
const base = `${__dirname}/../../src`;

const Assert    = require('assert');
const Config    = require(`${base}/config`);
const Core      = require(`${base}/core`);
const Database  = Core.Database;
const Http	    = Core.Http;
const Router    = Core.Router;
const BusStop   = require(`${base}/busStop/busStopModel`);

describe('BusStop API', () => {
	
	let server, host;
	
	before(function*() {
		let ip = '0.0.0.0', port = 8080;
		host = `http://${ip}:${port}`;
		
		global.database = yield Database.connect();
		yield global.database.collection('busStop').insert(new BusStop('lineCode', 'description', 'agency', []));
		
		let router = new Router();
		router.registerResources(Config.resources);
		server = router.start(ip, port);
	});
	
	it('should get a single bus stop by doing a GET request to /v3/busStop/lineCode', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v3/busStop/lineCode`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data.line, 'lineCode');
			Assert.equal(data.description, 'description');
			Assert.equal(data.agency, 'agency');
		}
	});
	
	after(function*() {
		server.close();
		yield global.database.collection('busStop').remove({});
	});
});
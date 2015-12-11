'use strict';
/* global describe, it, after, before, __dirname, global; */
const base = `${__dirname}/../../src`;

const Assert    = require('assert');
const Config    = require(`${base}/config`);
const Core      = require(`${base}/core`);
const Http	    = Core.Http;
const Router    = Core.Router;
const LoggerF	= Core.LoggerFactory;

describe('Log API', () => {
	
	let server, host, content;
	
	before(() => {
		let ip = '0.0.0.0', port = 8080;
		host = `http://${ip}:${port}`;
		content = 'INFO';
		
		LoggerF.getLogger(Config.logs.provider, 'PROVIDER').info(content);
		LoggerF.getRuntimeLogger().info(content);
		LoggerF.getServerLogger().info(content);
		
		let router = new Router();
		router.registerResources(Config.resources);
		server = router.start(ip, port);
	});
	
	it('should get 1 line of provider log by doing a GET request to /v2/log/dataprovider/1', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v2/log/dataprovider/1`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.join('').indexOf(content)>-1, true);
		}
	});
	
	it('should get 1 line of runtime log by doing a GET request to /v2/log/runtime/1', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v2/log/runtime/1`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.join('').indexOf(content)>-1, true);
		}
	});
	
	it('should get 1 line of server log by doing a GET request to /v2/log/server/1', function*() {
		let data;
		try {
			var output = yield Http.get(`${host}/v2/log/server/1`);
			data = JSON.parse(output);
		} catch(e) {
			data = JSON.parse(e.response.body);
		} finally {
			Assert.equal(data instanceof Array, true);
			Assert.equal(data.join('').indexOf(content)>-1, true);
		}
	});
	
	after(() => { server.close(); });
});
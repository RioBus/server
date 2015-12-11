'use strict';
const Config = require('../config');
const File = require('../core').File;

class LogResource {

	get base() { return '/v2/log'; }

	constructor(router) {
		router.get('/dataprovider/:lines', this.getDataProviderLog);
		router.get('/runtime/:lines', this.getRuntimeLog);
		router.get('/server/:lines', this.getServerLog);
	}
	
	getDataProviderLog(request, response) {
		const lines = request.params.lines;
		const file = new File(Config.logs.provider);
		response.send(file.read().split("\n").reverse().filter((n)=>{ return n!==""; }).slice(0, lines));
	}
	
	getRuntimeLog(request, response) {
		const lines = request.params.lines;
		const file = new File(Config.logs.runtime);
		response.send(file.read().split("\n").reverse().filter((n)=>{ return n!==""; }).slice(0, lines));
	}
	
	getServerLog(request, response) {
		const lines = request.params.lines;
		const file = new File(Config.logs.server);
		response.send(file.read().split("\n").reverse().filter((n)=>{ return n!==""; }).slice(0, lines));
	}
}
module.exports = LogResource;
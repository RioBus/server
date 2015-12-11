'use strict';
const Robe = require('robe');
const Config = require('../config');

class Database {
	
	static connect(config) {
		if(!config) config = Config.database;
		var url = `${config.host}:${config.port}/${config.dbName}`;
		if(config.user!=='' && config.pass!=='') url = `${config.user}:${config.pass}@${url}`;
		return Robe.connect(url);
	}
}

module.exports = Database;
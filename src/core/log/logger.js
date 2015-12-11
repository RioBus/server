'use strict';
const Config = require('../../config');
const File = require('../file');

/**
 * Logger class
 * 
 * Improved logging interface
 * @class {Logger}
 */
class Logger {
	
	constructor(path) {
		if(!path) path = Config.logs.runtime;
		this.fs = new File(path);
	}
	
	/**
	 * Displays an alert level log
	 * @param {string} content - Log message
	 * @return {void}
	 */
	alert(content) {
		this.log(content, 'ALERT');
	}
	
	/**
	 * Displays an error level log
	 * @param {string} content - Log message
	 * @return {void}
	 */
	error(content) {
		this.log(content, 'ERROR');
	}
	
	/**
	 * Displays an information level log
	 * @param {string} content - Log message
	 * @return {void}
	 */
	info(content) {
		this.log(content);
	}
	
	/**
	 * Displays an custom level log
	 * @param {string} content - Log message
	 * @param {string} level - Log level (Optional)
	 * @return {void}
	 */
	log(content, level) {
		if(!level) level = 'INFO';
		var text = `[${new Date().toISOString()}] (${level}) ${content}`;
		console.log(text);
		this.fs.append(text);
	}
}
module.exports = Logger;
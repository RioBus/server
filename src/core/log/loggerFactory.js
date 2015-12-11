'use strict';
const Logger = require('./logger');
const Config = require('../../config');

/**
 * LoggerFactory
 *
 * Factories Logger objects
 */
class LoggerFactory {

    /**
     * Gets a new Logger instance
     * @param {string} filePath - Log file path
     * @param {string} flag - Log flag (default: RUNTIME)
     * @returns {Logger}
     */
    static getLogger(filePath, flag) {
        if(!filePath) filePath = Config.logs.runtime;
        if(!flag) flag = '';
        return new Logger(filePath, flag);
    }

    /**
     * Gets a new Logger instance to log runtime messages
     * @returns {Logger}
     */
    static getRuntimeLogger() {
        let runtimeLogPath = Config.logs.runtime;
        return LoggerFactory.getLogger(runtimeLogPath, 'RUNTIME');
    }

    /**
     * Gets a new Logger instance to log server messages
     * @returns {Logger}
     */
    static getServerLogger() {
        let serverLogPath = Config.logs.server;
        return LoggerFactory.getLogger(serverLogPath, 'SERVER');
    }
}
module.exports = LoggerFactory;
'use strict';
const LoggerFactory = require('./log/loggerFactory');
const Config  = require('../config');
const ServerDriver = require('express');
const BodyParser = require("body-parser");
const compression = require('compression');
let logger = LoggerFactory.getServerLogger();

/**
 * Class Router represents the RESTful router, which
 * handles all the HTTP routes configured in the application.
 * @class {Router}
 */
class Router {

    constructor(){
        this.driver = new ServerDriver();
        this.driver.use(compression());
        this.driver.use(BodyParser.urlencoded({extended: true}));
        this.driver.use(BodyParser.json());
        this.driver.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            logger.info('Serving route '+req.url+' (GET)');
            next();
        });
    }

    /**
     * Registers a list of resources to handle routes
     * @param {Array} resources
     */
    registerResources(resources) {
        let root = Config.root;
        for(var res of resources) {
            let Resource = require(`${root}/${res}`);
            var session = new ServerDriver();
            let resource = new Resource(session);
            this.driver.use(resource.base, session);
            logger.info('Resource registered: '+res);
        }
    }

    /**
     * Starts the RESTful server
     * @param {string} ip - Server bind ip
     * @param {number} port - Server bind port
     * @param {Function} callback
     * @returns {Object}
     */
    start(ip, port, callback) {
        return this.driver.listen(port, ip, function(){
            if(callback) callback();
            logger.info(`Server started in http://${ip}:${port}`);
        });
    }
}
module.exports = Router;
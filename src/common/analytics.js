'use strict';
const Config = require('../config');
/**
 * Implements Google Analytics tracking system
 *
 * @class {Analytics}
 * @constructor
 */
class Analytics {

    constructor(ua, host) {
		this.ua = (ua)? ua : Config.analytics.ua;
		this.host = (host)? host : Config.analytics.host;
        this.driver = require("nodealytics");
    }
    
    /**
     * Checks if the configuration is set. If not, avoids the execution.
     * @return {boolean}
     */
    get disabled() {
        return (!this.ua || !this.host);
    }

    /**
     * Starts the tracking service
     * @param {Function} callback - (params: error, response)
     */
    initialize(callback) {
        if(this.disabled) return;
        if(callback===undefined) callback = function(){};
        this.driver.initialize(this.ua, this.host, callback);
    }

    /**
     * Tracks the request to a given page
     *
     * @param {String} id - Tracking identifier
     * @param {String} path - Request path
     * @param {Function} callback - (params: error, response)
     */
    trackPage(id, path, callback) {
        if(this.disabled) return;
        this.driver.trackPage(id, path, callback);
    }

    /**
     * Tracks a given event
     *
     * @param {String} id - Tracking identifier
     * @param {String} path - Request path
     * @param {String} label - Event label
     * @param {Function} callback - (params: error, response)
     */
    trackEvent(id, path, label, callback) {
        if(this.disabled) return;
        this.driver.trackEvent(id, path, label, callback);
    }
}
module.exports = Analytics;
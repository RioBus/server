'use strict';
const request = require('request-promise');

var optionsObj = {
    method: 'GET',
    simple: true,
    resolveWithFullResponse: true,
    json: true
}
/**
 * Creates a new synchronized HttpRequest
 * @class {Http}
 */
class Http {
    
    /**
     * Makes requests through Options object
     * @param {Object} options - Options object
     * @returns {Promise}
     */
    static request(options) {
        var data = JSON.parse(JSON.stringify(optionsObj));
        for(var key in Object.keys(options)) {
            data[key] = options[key];
        }
        return request(options);
    }

    /**
     * Makes GET request
     * @param {string} host - Host URL
     * @returns {Promise}
     */
    static get(host){
        return Http.request({ uri: host });
    }

    /**
     * Makes POST request
     * @param {string} host - Host URL
     * @param {Object} data - Data to be sent
     * @returns {Promise}
     */
    static post(host, data){
        return Http.request({ method: 'POST', uri: host, body: data });
    }

    /**
     * Makes PUT request
     * @param {string} host - Host URL
     * @param {Object} options
     * @returns {Promise}
     */
    static put(host, data){
        return Http.request({ method: 'PUT', uri: host, body: data });
    }

    /**
     * Makes DELETE request
     * @param {String} host - Host URL
     * @returns {Promise}
     */
    static delete(host){
        return Http.request({ method: 'DELETE', uri: host });
    }
}
module.exports = Http;
import {HttpRequest} from '../core/httprequest';
import {Factory} from '../common/factory';
import {Bus} from '../domain/bus';
import {BusList} from '../domain/buslist';
import {File} from '../core/file';

/**
 * DataAccess responsible for managing data access to the data stored in the
 * external server.
 *
 * @class ServerDataAccess
 * @constructor
 */
export class ServerDataAccess{

    constructor(){
        "use strict";
        this.logger = Factory.getDataProviderLogger();
    }

    /**
     * Retrieves all data from the external storage
     * @returns {Array}
     */
    getAllData(){
        "use strict";
        let body = this.requestFromServer(); // Requesting to the external server

        if(body.type || !body.DATA){
            this.logger.error("JSON response error.");
            return body;
        }
        let data = body.DATA;
        //let columns = body.COLUMNS;
        // columns: ['DATAHORA', 'ORDEM', 'LINHA', 'LATITUDE', 'LONGITUDE', 'VELOCIDADE', 'DIRECAO']

        var dataList = {};
        var indexedList = {};
        var busCount = 0;
        for(var d of data){
            // Converting external data do the application's pattern
            let bus = new Bus(d[2],d[1],d[5],d[6],d[3],d[4],d[0]);
            if(bus.line==="") bus.line = "indefinido";
            let lineExists = Object.keys(dataList).indexOf(bus.line.toString());

            if(lineExists<0) dataList[bus.line.toString()] = [];

            let index = dataList[bus.line.toString()].length;
            indexedList[bus.order] = {line: bus.line.toString(), position: index};
            dataList[bus.line.toString()].push(bus);
            busCount++;
        }

        return new BusList(dataList, indexedList, busCount);
    }

    /**
     * Stores the given data to the local storage
     * @param {String} data
     */
    storeData(data){
        "use strict";
        let config = Factory.getConfig().server.dataProvider;
        data = {
            data: data,
            timestamp: (new Date).toLocaleString()
        };
        let file = new File(config.dataPath);
        file.write(JSON.stringify(data));

        let mock = new File(config.mock);
        try{
            let size = mock.read();
            if(size<=0){
                this.logger.info("Filling mock file");
                mock.write(JSON.stringify(data));
            }
        } catch(e){
            this.logger.info("Creating mock file");
            mock.write(JSON.stringify(data));
        }

    }

    /**
     * Does the request to the external server and retrieves the data
     * @returns {*}
     */
    requestFromServer(){
        "use strict";
        let config = Factory.getConfig().server.dataProvider;
        let http = new HttpRequest();
        let options = {
            headers: {
                'Accept': '*/*',
                'Cache-Control': 'no-cache'
            },
            json: true
        };
        let requestPath = 'http://'+ config.host + config.path.bus;
        try{
            let response = http.get(requestPath, options);
            return this.respondRequest(response);
        } catch(e){
            this.logger.error(e);
            e.type = 'error';
            return e;
        }
    }

    /**
     * Verifies the request response status and returns the correct output
     * @param {*} response
     * @returns {*}
     */
    respondRequest(response){
        "use strict";
        switch(response.statusCode){
            case 200:
                this.logger.info('(200) Request OK.');
                return JSON.parse(response.getBody());
            case 302:
                this.logger.error('(302) Server moved temporarily.');
                return {type: 'error', code: response.statusCode};
            case 404:
                this.logger.error('(404) Not found.');
                return {type: 'error', code: response.statusCode};
            case 503:
                this.logger.error('(503) Server unavailable.');
                return {type: 'error', code: response.statusCode};
            default:
                this.logger.error('('+response.statusCode+') An error ocurred.');
                return {type: 'error', code: response.statusCode};
        }
    }
}
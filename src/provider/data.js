import {Factory} from '../common/factory';
import {ServiceFactory} from '../service/factory';

/**
 * DataProvider process bootstrapper
 *
 * Bootstraps the Data Provider process, which runs in background to search and store
 * the bus information given in by the DataRio webservice.
 */
export class DataProvider{

    static main(argv){
        "use strict";
        let logger = Factory.getDataProviderLogger();
        logger.info("Started data provider");

        let service = ServiceFactory.getServerService();
        service.storeAllData();
    }
}
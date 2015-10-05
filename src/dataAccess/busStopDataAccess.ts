import Factory           = require("../common/factory");
import ICollection       = require("../core/database/iCollection");
import IDataAccess       = require("./iDataAccess");
import BusStop           = require("../domain/entity/busStop");
import BusStopModelMap   = require("../domain/modelMap/busStopModelMap");
import Logger            = require("../common/logger");
import DbContext         = require("../core/database/dbContext");

declare var Config: any, database: DbContext;

/**
 * DataAccess referred to BusStop stored data
 *
 * Does operations over BusStop data
 * @class BusStopDataAccess
 */
class BusStopDataAccess implements IDataAccess {
    
    private db: DbContext;
    private collection: ICollection<BusStop>;

    public constructor(db: DbContext = database) {
        this.collection = db.collection<BusStop>(new BusStopModelMap());
    }

    /**
     * Retrieves the BusStop instance given a line.
     * @param {string} line - Line identifier
     * @return {BusStop}
     */
	public retrieve(line: string): BusStop {
        return this.collection.findOne({line: line});
    }

	/**
	 * Not implemented.
	 */
	public update(): void {}
	
	/**
	 * Not implemented.
	 */
	public delete(): void {}
	
	/**
	 * Not implemented.
	 */
    public create(): void {}
}
export = BusStopDataAccess;
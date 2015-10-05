import DbContext         = require("../core/database/dbContext");
import Factory           = require("../common/factory");
import ICollection       = require("../core/database/iCollection");
import IDataAccess       = require("./iDataAccess");
import IModelMap         = require("../core/database/iModelMap");
import Itinerary         = require("../domain/entity/itinerary");
import ItineraryHeader   = require("../domain/entity/itineraryHeader");
import ItineraryModelMap = require("../domain/modelMap/itineraryModelMap");
import Logger            = require("../common/logger");

declare var Config: any, database: DbContext;

class ItineraryHeaderMap implements IModelMap {
	public collectionName: string = "itinerary";
	public preConfig(collection: ICollection<any>): void {}
	public prepareToInput(data: any): any { return data; }
	public getInstance<T>(data: any): any { return data; }
}

/**
 * DataAccess referred to Itinerary stored data
 *
 * Does operations over Itinerary data
 * @class ItineraryDataAccess
 */
class ItineraryDataAccess implements IDataAccess{
    
    private collection: ICollection<Itinerary>;

    public constructor(private db: DbContext = database) {
        this.collection = this.db.collection<Itinerary>(new ItineraryModelMap());
    }

    /**
     * Retrieves the Itinerary data.
     * @param {string} line (optional)
     * @return {Itinerary | ItineraryHeader[]}
     */
	public retrieve(data?: string): Itinerary | ItineraryHeader[] {
        return (data!==undefined)? this.getItinerary(data) : this.getItineraries();
    }

    /**
     * Retrieves the Itinerary spots given a line
     * @param {string} line
     * @return {Itinerary}
     */
    private getItinerary(line: string): Itinerary {
		return this.collection.findOne({line: line});    
    }

    /**
     * Retrieves all the Itineraries
     * @return {ItineraryHeader[]}
     */
    private getItineraries(): ItineraryHeader[] {
        var collection: ICollection<ItineraryHeader> = this.db.collection<any>(new ItineraryHeaderMap());
        var pipeline: any = [ { $group: { "_id": "$line", "description": { $first: "$description" }, "keywords" : { $first: "$keywords"} } } ];
        var data: any = collection.aggregate(pipeline, {});
        var list: ItineraryHeader[] = new Array<ItineraryHeader>();
        data.forEach( (header)=>{
            list.push(new ItineraryHeader(header._id, header.description, header.keywords));
        });
        return list;
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
export = ItineraryDataAccess;
import Bus 		         = require("../domain/entity/bus");
import BusModelMap       = require("../domain/modelMap/busModelMap");
import DbContext         = require("../core/database/dbContext");
import ICollection       = require("../core/database/iCollection");
import IDataAccess       = require("../dataAccess/iDataAccess");
import Itinerary         = require("../domain/entity/itinerary");
import ItineraryModelMap = require("../domain/modelMap/itineraryModelMap");

declare var database: DbContext;

/**
 * Does the operations over bus collection.
 * @class SearchDataAccess
 */
class SearchDataAccess implements IDataAccess {
	
	private collectionBus: ICollection<Bus>;
	private collectionItinerary: ICollection<Itinerary>;
	
	public constructor(db: DbContext = database) {
		this.collectionBus = db.collection<Bus>(new BusModelMap());
		this.collectionItinerary = db.collection<Itinerary>(new ItineraryModelMap());
	}

    /**
     * Retrieves the Bus data.
     * @param {string[]} data Line/order list (optional)
     * @return {Bus[]}
     */
	public retrieve(data?: string[]): Bus[] {
		var output: Bus[] = (data===undefined)? this.getAllBuses() : this.searchBuses(data);
		return output;
	}
	
	/**
	 * Retrieves the data of all of the most recent updates for each bus
	 * @return {Bus[]}
	 */
	private getAllBuses(): Bus[] {
		return this.collectionBus.find();
	}
	
	/**
	 * Retrieves the data of all of the most recent updates for each bus given a list
	 * of line codes or orders.
	 * @param {string[]} data
	 * @return {Bus[]}
	 */
	private searchBuses(data: string[]): Bus[] {
		var output: Bus[] = this.getByLine(data);
		if(output.length === 0) output = this.getByCode(data);
		if(output.length === 0) output = this.getByKeywords(data);
		return output;
	}
	
	/**
	 * Queries the buses by line code
	 * @param {string[]} lines
	 * @return {Bus[]}
	 */
	private getByLine(lines: string[]): Bus[] {
		return this.collectionBus.find({ line: { $in: lines }});
	}
	
	/**
	 * Queries the buses by order codes
	 * @param {string[]} codes
	 * @return {Bus[]}
	 */
	private getByCode(codes: string[]): Bus[] {
		return this.collectionBus.find({ order: { $in: codes }});
	}
	
	private getByKeywords(keyword: string[]): Bus[] {
		var itineraryList: Itinerary[] = this.collectionItinerary.find( { $text: { $search: keyword.join(" ") } } );
		var listLines: string[] = [];
		var listBus: Bus[];
		for(var i = 0; i < itineraryList.length; i++){
			listLines.push(itineraryList[i].getLine());
		}
		listBus = this.getByLine(listLines);
		return listBus;
	}
	
	/**
	 * Not implemented.
	 */
	public delete(): any {}
	
	/**
	 * Not implemented.
	 */
	public create(): any {}
	
	/**
	 * Not implemented.
	 */
	public update(): any {}
}
export = SearchDataAccess;
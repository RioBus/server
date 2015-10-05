declare var require, describe, it, before;
import Bus				 = require("../../src/domain/entity/bus");
import BusModelMap		 = require("../../src/domain/modelMap/busModelMap");
import Config		 	 = require("../../src/config");
import DbContext	 	 = require("../../src/core/database/dbContext");
import IDataAccess		 = require("../../src/dataAccess/iDataAccess");
import ICollection		 = require("../../src/core/database/iCollection");
import Itinerary		 = require("../../src/domain/entity/itinerary");
import ItineraryModelMap = require("../../src/domain/modelMap/itineraryModelMap");
import SearchDataAccess	 = require("../../src/dataAccess/searchDataAccess");

var Assert = require("assert");

var dataAccess: IDataAccess, code: string = (new Date()).toISOString(), obj: Bus;

describe("SearchDataAccess", () => {
	
	before(() => {
		var db: DbContext = new DbContext(Config.environment.database);
		dataAccess = new SearchDataAccess(db);
		
		var itineraryCollection: ICollection<Itinerary> = db.collection<Itinerary>(new ItineraryModelMap());
		var itinerary: Itinerary = new Itinerary("busline", "no description", "no agency", "busline no agency description", []);
		itineraryCollection.save(itinerary);
		
		var collection: ICollection<Bus> = db.collection<Bus>(new BusModelMap());
		obj = new Bus("busline", code, 20, 3, 33, 45, (new Date()).toISOString(), "unknown");
		collection.save(obj);
	});
	
	it("should return a list of buses with the given existing line", (done) => {
		var expected: boolean = true;
		var current: boolean = false;
		var data: Bus[] = dataAccess.retrieve([obj.getLine()]);
		data.forEach((bus: Bus) => {
			current = bus.getLine() === obj.getLine();
		});
		Assert.equal(current, expected);
		done();
	});
	
	it("should return an empty list when searching for an unexisting bus or line", (done) => {
		var expected: Bus[] = [];
		var current: Bus[] = dataAccess.retrieve(["unexisting_line"]);
		Assert.deepEqual(current, expected);
		done();
	});
	
	it("should find the buses registered to a line discovered by searching in the keywords", (done) => {
		var notExpected: number = 0;
		var current: number = dataAccess.retrieve(["agency"]).length;
		Assert.notEqual(current, notExpected);
		done();
	});
	
});
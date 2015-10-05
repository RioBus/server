declare var require, describe, it, before;
import Config			 	= require("../../src/config");
import DbContext		 	= require("../../src/core/database/dbContext");
import IDataAccess		 	= require("../../src/dataAccess/iDataAccess");
import ICollection		 	= require("../../src/core/database/iCollection");
import Itinerary			= require("../../src/domain/entity/itinerary");
import ItineraryHeader		= require("../../src/domain/entity/itineraryHeader");
import ItineraryDataAccess	= require("../../src/dataAccess/itineraryDataAccess");
import ItineraryModelMap	= require("../../src/domain/modelMap/itineraryModelMap");

var Assert = require("assert");

var dataAccess: IDataAccess, line: string = (new Date()).toISOString(), obj: Itinerary;

describe("ItineraryDataAccess", () => {
	
	before(() => {
		obj = new Itinerary(line, "no description", "no agency", "no keywords", []);
		var db: DbContext = new DbContext(Config.environment.database);
		var collection: ICollection<Itinerary> = db.collection<Itinerary>(new ItineraryModelMap());
		collection.save(obj);
		
		dataAccess = new ItineraryDataAccess(db);
	});
	
	it("should retrieve a Itinerary instance given it's line identifier", (done) => {
		var expected: boolean = true;
		var current: boolean = dataAccess.retrieve(obj.getLine()) instanceof Itinerary;
		Assert.equal(current, expected);
		done();
	});
	
	it("should return null when searching for an unexisting line", (done) => {
		var expected: boolean = null;
		var current: boolean = dataAccess.retrieve("unexisting line");
		Assert.equal(current, expected);
		done();
	});
	
	it("should return the headers of all the itineraries saved if searching without a line", (done) => {
		var expected: boolean = true;
		var current: boolean = dataAccess.retrieve()[0] instanceof ItineraryHeader;
		Assert.equal(current, expected);
		done();
	});
	
});
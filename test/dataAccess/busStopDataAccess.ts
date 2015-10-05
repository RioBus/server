declare var require, describe, it, before;
import BusStop			 = require("../../src/domain/entity/busStop");
import BusStopDataAccess = require("../../src/dataAccess/busStopDataAccess");
import BusStopModelMap	 = require("../../src/domain/modelMap/busStopModelMap");
import Config			 = require("../../src/config");
import DbContext		 = require("../../src/core/database/dbContext");
import IDataAccess		 = require("../../src/dataAccess/iDataAccess");
import ICollection		 = require("../../src/core/database/iCollection");

var Assert = require("assert");

var dataAccess: IDataAccess, line: string = (new Date()).toISOString(), obj: BusStop;

describe("BusStopDataAccess", () => {
	
	before(() => {
		obj = new BusStop(line, "no description", "no agency", []);
		var db: DbContext = new DbContext(Config.environment.database);
		var collection: ICollection<BusStop> = db.collection<BusStop>(new BusStopModelMap());
		collection.save(obj);
		
		dataAccess = new BusStopDataAccess(db);
	});
	
	it("should retrieve a BusStop instance given it's line identifier", (done) => {
		var expected: boolean = true;
		var current: boolean = dataAccess.retrieve(obj.getLine()) instanceof BusStop;
		Assert.equal(current, expected);
		done();
	});
	
	it("should return null when searching for an unexisting line", (done) => {
		var expected: boolean = null;
		var current: boolean = dataAccess.retrieve("unexisting line");
		Assert.equal(current, expected);
		done();
	});
	
});
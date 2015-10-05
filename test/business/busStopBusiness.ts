declare var require, describe, it, before;
import BusStopBusiness	= require("../../src/business/busStopBusiness");
import IBusiness		= require("../../src/business/iBusiness");
import IDataAccess		= require("../../src/dataAccess/iDataAccess");
import BusStop			= require("../../src/domain/entity/busStop");

var Assert = require("assert");

var business: IBusiness;

class MockedDataAccess implements IDataAccess {
	public create(): void {}
	public retrieve(line: string): BusStop { return (line==="485")? new BusStop("485", "no description", "no agency", []) : null; }
	public update(): void {}
	public delete(): void {}
}

describe("BusStopBusiness", () => {
	
	before(() => {
		business = new BusStopBusiness(new MockedDataAccess());
	});
	
	it("should retrieve the correct BusStop instance when searching for an existing line", (done) => {
		var expected: BusStop = new BusStop("485", "no description", "no agency", []);
		var current: BusStop = business.retrieve("485");
		Assert.deepEqual(current, expected);
		done();
	});
	
	it("should retrieve an empty BusStop instance when searching for an uneexisting line", (done) => {
		var expected: BusStop = new BusStop("123", "desconhecido", "desconhecido", []);
		var current: BusStop = business.retrieve("123");
		Assert.deepEqual(current, expected);
		done();
	});
});
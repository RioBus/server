declare var require, describe, it, before;
import IBusiness		 = require("../../src/business/iBusiness");
import IDataAccess		 = require("../../src/dataAccess/iDataAccess");
import Itinerary		 = require("../../src/domain/entity/itinerary");
import ItineraryBusiness = require("../../src/business/itineraryBusiness");

var Assert = require("assert");

var business: IBusiness;

class MockedDataAccess implements IDataAccess {
	public create(): void {}
	public retrieve(line: string): Itinerary { return (line==="485")? new Itinerary("485", "no description", "no agency", "no keywords", []) : null; }
	public update(): void {}
	public delete(): void {}
}

describe("ItineraryBusiness", () => {
	
	before(() => {
		business = new ItineraryBusiness(new MockedDataAccess());
	});
	
	it("should retrieve the correct Itinerary instance when searching for an existing line", (done) => {
		var expected: Itinerary = new Itinerary("485", "no description", "no agency", "no keywords", []);
		var current: Itinerary = business.retrieve("485");
		Assert.deepEqual(current, expected);
		done();
	});
	
	it("should retrieve an empty Itinerary instance when searching for an uneexisting line", (done) => {
		var expected: Itinerary = new Itinerary("123", "desconhecido", "desconhecido", "desconhecido", []);
		var current: Itinerary = business.retrieve("123");
		Assert.deepEqual(current, expected);
		done();
	});
	
});
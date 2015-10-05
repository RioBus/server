declare var require, describe, it, before;
import ItineraryService  = require("../../src/service/itineraryService");
import IService          = require("../../src/service/iService");
import Itinerary         = require("../../src/domain/entity/itinerary");
import IBusiness         = require("../../src/business/iBusiness");

var Assert = require("assert");

class MockedBusiness implements IBusiness{
	public create  (): void {}
	public retrieve(data: any): any { return data; }
	public update  (): void {}
	public delete  (): void {}	
}

var service: IService;

describe("ItineraryService", () => {
	
	before(()=> {
		service = new ItineraryService(new MockedBusiness());
	});
	
	it("should pass on the data without any alteration", (done) => {
		var expected: string = "retrievable content";
		var current: string = service.retrieve(expected);
		Assert.equal(current, expected);
		done();
	});
});

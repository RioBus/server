declare var require, describe, it, before;
import IService   = require("../../src/service/iService");
import Itinerary  = require("../../src/domain/entity/itinerary");
import IBusiness  = require("../../src/business/iBusiness");
import LogService = require("../../src/service/logService");

var Assert = require("assert");

class MockedBusiness implements IBusiness{
	public create  (): void {}
	public retrieve(data: any): any { return data; }
	public update  (): void {}
	public delete  (): void {}	
}

var service: IService;

describe("LogService", () => {
	
	before(()=> {
		service = new LogService(new MockedBusiness());
	});
	
	it("should propagate data without any alteration", (done) => {
		var expected: string = "retrievable content";
		var current: string = service.retrieve(expected, 10);
		Assert.equal(current, expected);
		done();
	});
});

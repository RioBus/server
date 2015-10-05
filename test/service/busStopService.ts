declare var require, describe, it, before;
import BusStopService  = require("../../src/service/busStopService");
import IService        = require("../../src/service/iService");
import BusStop         = require("../../src/domain/entity/busStop");
import IBusiness       = require("../../src/business/iBusiness");

var Assert = require("assert");

class MockedBusiness implements IBusiness{
	public create  (): void {}
	public retrieve(data: any): any { return data; }
	public update  (): void {}
	public delete  (): void {}	
}

var service: IService;

describe("BusStopService", () => {
	
	before(()=> {
		service = new BusStopService(new MockedBusiness());
	});
	
	it("should pass on the data without any alteration", (done) => {
		var expected: string = "retrievable content";
		var current: string = service.retrieve(expected);
		Assert.equal(current, expected);
		done();
	});
});

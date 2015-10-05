declare var require, describe, it, before;
import LogBusiness = require("../../src/business/logBusiness");
import IBusiness = require("../../src/business/iBusiness");
import IDataAccess = require("../../src/dataAccess/iDataAccess");

var Assert = require("assert");

var business: IBusiness;

class MockedDataAccess implements IDataAccess {
	public create(): void {}
	public retrieve(): string[] { return "string content".split(" "); }
	public update(): void {}
	public delete(): void {}
}

describe("LogBusiness", () => {
	
	before(() => {
		var config: any = { runtime: "/custom/path/file.txt" };
		business = new LogBusiness(new MockedDataAccess(), config);
	});
	
	it("should return a string", (done) => {
		var expected: string = "string\ncontent";
		var current: string = business.retrieve(232, 1);
		Assert.equal(current, expected);
		done();
	});
	
});
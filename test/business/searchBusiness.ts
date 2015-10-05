declare var require, describe, it, before;
import SearchBusiness	= require("../../src/business/searchBusiness");
import IBusiness		= require("../../src/business/iBusiness");
import IDataAccess		= require("../../src/dataAccess/iDataAccess");
import Bus				= require("../../src/domain/entity/bus");

var Assert = require("assert");

var business: IBusiness, max: number = 5;

var buses: Bus[] = [
	new Bus("123", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("122", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("120", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("485", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("486", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("381", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("386", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("443", "A12345", 10, 0, 23, 43, (new Date()).toISOString()),
	new Bus("747", "A12345", 10, 0, 23, 43, (new Date()).toISOString())
];

class MockedDataAccess implements IDataAccess {
	public create(): void {}
	public retrieve(lines: string[]): Bus[] { return (lines)? buses.filter((bus)=> { return lines.indexOf(bus.getLine())>-1; }) : buses; }
	public update(): void {}
	public delete(): void {}
}

describe("SearchBusiness", () => {
	
	before(() => {
		business = new SearchBusiness(new MockedDataAccess(), max);
	});
	
	it("should retrieve a full Bus[] if no lines were given", (done) => {
		var expected: number = buses.length;
		var current: number = business.retrieve().length;
		Assert.equal(current, expected);
		done();
	});
	
	it("should retrieve an Bus[] without limitation when count(lines)<=max", (done) => {
		var expected: number = 3;
		var current: number = business.retrieve(["381", "485", "386"]).length;
		Assert.equal(current, expected);
		done();
	});
	
	it("should retrieve a limited list of Bus[] when lines>max are given", (done) => {
		var expected: number = 5;
		var current: number = business.retrieve(["381", "485", "386", "747", "443", "120"], true).length;
		Assert.equal(current, expected);
		done();
	});
});
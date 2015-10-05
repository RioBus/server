declare var require, describe, it, before;
import IDataAccess	 = require("../../src/dataAccess/iDataAccess");
import LogDataAccess = require("../../src/dataAccess/logDataAccess");
import Config		 = require("../../src/config");

var Assert = require("assert");

var dataAccess: IDataAccess, root: string = Config.rootPath;

describe("LogDataAccess", () => {
	
	before(() => {
		dataAccess = new LogDataAccess();
	});
	
	it("should retrieve a line array containing the count of lines informed", (done) => {
		var path: string = root+"/app.js";
		var expected: number = 10;
		var current: number = dataAccess.retrieve(path, expected).length;
		Assert.equal(current, expected);
		done();
	});
	
	it("should raise an exception if the file is not found.", (done) => {
		var path: string = "unexistingfile.txt";
		var expected: boolean = true;
		var current: boolean;
		try {
			current = dataAccess.retrieve(path, 0) instanceof Error;
		} catch (e) {
			current = e instanceof Error;
		} finally {
			Assert.equal(current, expected);
			done();
		}
	});
	
});
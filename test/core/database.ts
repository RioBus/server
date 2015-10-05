declare var require, describe, it;
import DbContext = require("../../src/core/database/dbContext");
import IBulk = require("../../src/core/database/iBulk");
import ICollection = require("../../src/core/database/iCollection");
import IModelMap = require("../../src/core/database/iModelMap");
import Config = require("../../src/config");

var Assert = require("assert");

class TestModelMap implements IModelMap {
	public collectionName: string = "test";
	public preConfig(): void {}
	public prepareToInput(data: any): any { return data; }
	public getInstance(data: any): any { return data; }
}

describe("Database", () => {
	
	var context: DbContext;
	try{
		context = new DbContext(Config.environment.database);
	}catch(e){ console.log(e) }
	
	it("should connect to the database", (done) => {
		var current : DbContext = context;
		var notExpected : DbContext = undefined; 
		Assert.notEqual(current, notExpected);
		done();
	});
	
	var collection: ICollection<any>;
	try{
		var modelMap: IModelMap = new TestModelMap();
		collection = <ICollection<any>> context.collection(modelMap);
	}
	catch(e){}
	
	it("should find the 'test' collection", (done) => {
		var current : ICollection<any> = collection;
		var notExpected : ICollection<any> = undefined;
		Assert.notEqual(current, notExpected);
		done();
	});
	
	var input: any = { date: (new Date()).toString() };
	
	it("should save the input object to the database", (done) => {
		var current: any = collection.save(input);
		var notExpected: any = null;
		Assert.notEqual(current, notExpected);
		done();
	});
	
	it("should find or create the object in the database", (done) => {
		var current: any = collection.findOrCreate(input);
		var notExpected: any = null;
		Assert.notEqual(current, notExpected);
		done();
	});
	
	var list: any[] = collection.find({});
	
	it("should return a list of documents", (done) =>{
		var current: string = typeof list;
		var expected: string = 'Array';
		Assert.notEqual(current, expected);
		done();
	});
	
	it("should return the number of documents in the collection", (done) => {
		var current: number = collection.count({});
		var notExpected: number = 0;
		Assert.notEqual(current, notExpected);
		done();
	});
	
	it("should return one document", (done) => {
		var current: any = collection.findOne(input);
		var notExpected: any = null;
		Assert.notEqual(current, notExpected);
		done();
	});
	
	it("should update a document", (done) => {
		var obj: any = JSON.stringify(input);
		obj = JSON.parse(obj);
		obj.line = expected;
		delete obj._id;
		
		var current: boolean = collection.update(input, obj);
		var expected: boolean = true;
		
		Assert.equal(current, expected);
		done();
	});
	
	it("should delete a document in the collection", done =>{
		var current: boolean = collection.remove(input);
		var expected: boolean = true;
		Assert.equal(current, expected);
		done();
	});
	
	it("should batch insert a document in the collection", (done) => {
		var bulk: IBulk<any> = collection.initBulk();
		bulk.insert(input);
		var current: any;
		var expected: boolean = true;
		try{
			bulk.execute();
			current = true;
		} catch(e){
			current = e;
		} finally {
			Assert.equal(current, expected);
			done();
		}
	});
	
	it("should batch update a document in the collection", (done) => {
		var bulk: IBulk<any> = collection.initBulk();
		
		var update: any = JSON.stringify(input);
		update = JSON.parse(update);
		update.line = "batch";
		delete update._id;
		bulk.find(input).update(update);
		var current: any;
		var expected: boolean = true;
		try{
			bulk.execute();
			current = true;
		} catch(e){
			current = e;
		} finally {
			Assert.equal(current, expected);
			done();
		}
	});
	
	it("should batch replace a document in the collection", (done) => {
		var bulk: IBulk<any> = collection.initBulk();
		
		var update: any = JSON.stringify(input);
		update = JSON.parse(update);
		update.line = "replace";
		delete update._id;
		
		bulk.find(input).replaceOne(update);
		var current: any;
		var expected: boolean = true;
		try{
			bulk.execute();
			current = true;
		} catch(e){
			current = e;
		} finally {
			Assert.equal(current, expected);
			done();
		}
	});
	
	it("should batch remove documents in the collection", (done) => {
		var bulk: IBulk<any> = collection.initBulk();
		
		var update: any = JSON.stringify(input);
		update = JSON.parse(update);
		update.line = "replace";
		delete update._id;
		
		bulk.find({line: { $in: ["batch", "replace"] } }).remove();
		var current: any;
		var expected: boolean = true;
		try{
			bulk.execute();
			current = true;
		} catch(e){
			current = e;
		} finally {
			Assert.equal(current, expected);
			done();
		}
	});
	
});
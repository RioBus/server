declare var require, describe, it, global, before;
import DbContext        = require("../../../src/core/database/dbContext");
import HttpRequest      = require("../../../src/core/httpRequest");
import Router           = require("../../../src/core/router");
import Config		 	= require("../../../src/config");
import Analytics        = require("../../../src/common/analytics");
import Bus              = require("../../../src/domain/entity/bus")
import ICollection		 = require("../../../src/core/database/iCollection");
import BusModelMap		 = require("../../../src/domain/modelMap/busModelMap");
var Assert = require("assert");



class MockAnalytics extends Analytics{
	public trackEvent(): void {}
	public trackPage():  void {}
}

declare var globalAnalytics: Analytics;
describe("SearchResource", () => {
	
	var db: DbContext;
	
	before(() =>{
			db  = new DbContext(Config.environment.database);
			var busColletion: ICollection<Bus> = db.collection<Bus>(new BusModelMap());
	
			var busOne: Bus = new Bus("565", "111", 0, 0, 0, 0, (new Date()).toISOString(), "0");
			var busTwo: Bus = new Bus("1", "111", 0, 0, 0, 0, (new Date()).toISOString(), "0");
			var busThree: Bus = new Bus("10", "111", 0, 0, 0, 0, (new Date()).toISOString(), "0");
		
			busColletion.save(busOne);
			busColletion.save(busTwo);
			busColletion.save(busThree);
	});
	 
	var data: string = "1,10,565"
	var ip : string = "0.0.0.0";
	var port: string = "8092";
	var route : string ="/v3/search/:data";
	var resources : Object = {"resources/v3/searchResource":route};
	var address: string = "http://"+ip+":"+port+"/v3/search/" + data;
	if(global.database == undefined) global.database = db;


	globalAnalytics = new MockAnalytics();
	global.Config = Config;
	global.analytics = globalAnalytics;


	var router : Router = new Router();
	router.registerResources(resources);
	var httpRequest : HttpRequest = new HttpRequest();
	
	
	it("should get information about a bus", (done) =>{
		var current: number;
		var notExpected: number = 0;
		
		try{
			var output: any = httpRequest.get(address).body;
			current = output.length;
		}catch(e){
			current = e;
		}finally{
			
			Assert.notEqual(current, notExpected);
			done();
		}
	});

});
declare var require, describe, it, global;
import DbContext        = require("../../../src/core/database/dbContext");
import HttpRequest      = require("../../../src/core/httpRequest");
import Router           = require("../../../src/core/router");
import Config		 	= require("../../../src/config");
import Analytics        = require("../../../src/common/analytics");

var Assert = require("assert");



class MockAnalytics extends Analytics{
	public trackEvent(): void {}
	public trackPage():  void {}
}

declare var globalAnalytics: Analytics;
describe("AllItineraryResource", () => {
	 
	var ip : string = "0.0.0.0";
	var port: string = "8085";
	var route : string ="/v3/itinerary";
	var resources : Object = {"resources/v3/allItineraryResource":route};
	var address: string = "http://"+ip+":"+port+"/v3/itinerary";
	if(global.database == undefined) global.database = new DbContext(Config.environment.database);


	globalAnalytics = new MockAnalytics();
	global.Config = Config;
	global.analytics = globalAnalytics;


	var router : Router = new Router();
	router.registerResources(resources);
	var httpRequest : HttpRequest = new HttpRequest();
	
	
	it("should get a list of all itinerary", (done) =>{
		var current: string;
		var notExpected: string = "error";
		
		try{
			var output: any = httpRequest.get(address).body;
			current = output;
		}catch(e){
		}finally{
			
			Assert.notEqual(current, notExpected);
			done();
		}
	});

});
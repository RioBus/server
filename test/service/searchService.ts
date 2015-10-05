declare var require, describe, it, before;
import SearchService     = require("../../src/service/searchService");
import IService          = require("../../src/service/iService");
import IBusiness         = require("../../src/business/iBusiness");
import Analytics		 = require("../../src/common/analytics");

var Assert               = require("assert");

class MockedBusiness implements IBusiness {
	public create  (): void {}
	public retrieve(line: string[], mustLimit: boolean): any { return { line: line, mustLimit: mustLimit }; }
	public update  (): void {}
	public delete  (): void {}	
}

class AnalyticsMock extends Analytics {
	trackPage(): void {}
	trackEvent(): void {}
}

var service: IService, limit: boolean = true;

var consortiumLines: string[] = ["301", "302", "303", "305", "306", "309", "314", "315", "316", "317","318", "331", "332", "337", "338", "339", "341", "343", "345", "346",	"348", "352", "353", "354", "360", "361", "363", "368", "371", "380", "382", "390", "501", "502", "504", "505", "525", "550", "555", "556", "557", "565", "600", "601", "607", "610", "611", "613", "614", "636", "651", "652", "667", "678", "686", "690", "691", "692", "693", "702", "709", "712", "721", "723", "734", "766", "774", "775", "781", "782", "783", "800", "805", "806", "808", "809", "810", "815", "816", "817", "818", "823", "827", "829", "831", "832", "844", "856", "859", "860", "861", "862", "863", "865", "875", "878", "880", "882", "886", "887", "888", "889", "890", "897", "899", "900", "931", "932", "940", "954", "955", "957", "959", "963", "964", "991", "2018", "2110", "2111", "2112", "2114", "2115", "2329", "2330", "2333", "2345", "2346", "2918", "LECD10", "LECD7", "SE614", "SE832", "SP306", "SP316", "SP341", "SP363", "LECD13", "SV2333", "SV363", "SV390", "SP343", "SV774", "SVA2345", "SVB2345", "SP352", "SP899", "SV301", "SV878"];

describe("SearchService", () => {
	
	before(()=> {
		service = new SearchService(new MockedBusiness(), limit, new AnalyticsMock());
	});
	
	it("should propagate only the user-agent if the line information is not set", (done) => {
		var expected: any = {
			line: undefined,
			mustLimit: undefined
		};
		var current: any = service.retrieve("user-agent");
		Assert.deepEqual(current, expected);
		done();
	});
	
	it("should propagate the user-agent, lines and limitation bool if the line information is set", (done) => {
		var expected: any = {
			line: ["123", "456", "789"],
			mustLimit: limit
		};
		var current: any = service.retrieve("user-agent", expected.line.join(","));
		Assert.deepEqual(current, expected);
		done();
	});
	
	it("should propagate the user-agent, line list and remove the limitation when searching for a consortium", (done) => {
		var expected: any = {
			line: consortiumLines,
			mustLimit: false
		};
		var current: any = service.retrieve("user-agent", "transcarioca");
		Assert.deepEqual(current, expected);
		done();
	});
});
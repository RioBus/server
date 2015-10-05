import IBusiness   = require("../business/iBusiness");
import IDataAccess = require("../dataAccess/iDataAccess");
import LogType	   = require("../common/logType");
import $inject 	   = require("../core/inject");

declare var Config;

/**
 * Log access business logics
 * @class LogBusiness
 */
class LogBusiness implements IBusiness {
	
	public constructor(private context: IDataAccess = $inject("dataAccess/logDataAccess"),
		private logConfig: any = Config.log) {}
	
	/**
	 * Retrieves the logs of a given type
	 * @param {number} logType code
	 * @param {number} lines
	 * @return {string}
	 */
	public retrieve(logType: number, lines: number): string {
		var logPath: string = this.getLogFilePath(logType);
		try{
			return this.context.retrieve(logPath, lines).join("\n");
		} catch (e) {
			return "";
		}
	}
	
	/**
	 * Gets the log file path for the given logType code
	 * @param {number} logType
	 * @return {string}
	 */
	private getLogFilePath(logType: number): string {
		switch(logType) {
			case LogType.DATA_PROVIDER: return this.logConfig.dataProvider;
			case LogType.SERVER: return this.logConfig.server;
			case LogType.RUNTIME: default: return this.logConfig.runtime;
		}
	}
	
	/**
	 * Not implemented.
	 */
	public delete(): any {}
	
	/**
	 * Not implemented.
	 */
	public create(): any {}
	
	/**
	 * Not implemented.
	 */
	public update(): any {}
}
export = LogBusiness;
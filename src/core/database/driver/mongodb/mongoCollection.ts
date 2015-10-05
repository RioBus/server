declare var require;
import IBulk   	   = require("../../iBulk");
import ICollection = require("../../iCollection");
import IModelMap   = require("../../iModelMap");
import MongoBulk   = require("./mongoBulk");
import Sync   	   = require("../../../sync");

var ObjectID	   = require("mongodb").ObjectID;
/**
 * MongoDb collection driver
 * @interface ICollection
 * @class MongoCollection
 */
class MongoCollection<T> implements ICollection<T>{
	
	public constructor(private context: any, private map?: IModelMap) {
		map.preConfig(this);
	}
	
	/**
	 * Gets current application object instance
	 * @param {any} data - The data to be converted.
	 * @return {any}
	 */
	private getData(data: any): any {
		return (this.map!==undefined)? this.map.getInstance<T>(data) : data;
	}
	
	/**
	 * Calculates aggregate values for the data in a collection.
	 * @param {any[]} pipeline - A sequence of data aggregation operations or stages.
	 * @param {any} options - Optional. Additional options that aggregate() passes to the aggregate command.
	 * @return {T[] | void}
	 */
	public aggregate(commands: any[], options: any = {}): T[] | void {
		if(options.out===undefined){
			var output: any[] = Sync.promise(this.context, this.context.aggregate, commands, options);
			var result: T[] = Array<T>();
			if(output.length>0) output.forEach( (data)=>{ result.push(this.getData(data)); }, this);
			return result;
		}
		else this.context.aggregate(commands, options, (error, out)=>{ if(error) throw error; });
	}
	
	/**
	 * Returns the count of documents that would match a find() query.
	 * @param {any} query - Optional. The query selection criteria.
	 * @return {number}
	 */
	public count(query: any={}): number {
		query = this.map.prepareToInput(query);
		return Sync.promise(this.context, this.context.count, query);
	}
	
	/**
	 * Creates indexes on collections.
	 * @param {any} fieldOrSpec - A document that contains the field and value pairs where the field is the index key and the value describes the type of index for that field.
	 * @param {any} options - Optional. A document that contains a set of options that controls the creation of the index.
	 * @return {void}
	 */
	public createIndex(fieldOrSpec: any, options: any = {}): void {
		this.context.ensureIndex(fieldOrSpec, options, (error, response)=>{ if(error) throw error; });
	}
	
	/**
	 * Selects documents in a collection and returns a cursor to the selected documents.
	 * @param {any} query - Optional. The query selection criteria. To return all documents in a collection, omit this parameter or pass an empty document ({}).
	 * @return {T[]}
	 */
	public find(query: any = {}): T[] {
		query = this.map.prepareToInput(query);
		var find: any = Sync.promise(this.context, this.context.find, query);
		var data: Array<any> = Sync.promise(find, find.toArray);
		var list: T[] = new Array<T>();
		data.forEach((obj) => { list.push(this.getData(obj)); }, this);
		return list;
	}
	
	/**
	 * Select the document with the given id.
	 * @param {number} id - Document id
	 * @return {T}
	 */
	public findById(id: string): T {
		try {
			return this.findOne({_id: new ObjectID(id)});
		} catch (e) {
			return null;
		}
	}
	
	/**
	 * Atomically modifies and returns a single document.
	 * @param {any} criteria - The selection criteria for the modification.
	 * @param {any} sort - Determines which document the operation modifies if the query selects multiple documents.
	 * @param {any} update - Performs an update of the selected document.
	 * @param {any} options - Optional. A document that contains a set of options that controls the operation.
	 * @return {T}
	 */
	public findAndModify(query: any, sort: any, update: any, options?: any): T {
		query = this.map.prepareToInput(query);
		var findAndModify: any = Sync.promise(this.context, this.context.findAndModify, query, sort, update, options);
		return (findAndModify.value!==null)? this.getData(findAndModify.value) : null;
	}
	
	/**
	 * Performs a query and returns a single document.
	 * @param {any} query - Specifies query selection criteria using query operators. Pass an empty document ({}) to return the first document in the collection.
	 * @param {any} options - Optional. A document that contains a set of options that controls the operation.
	 */
	public findOne(query: any, options: any={}): T {
		query = this.map.prepareToInput(query);
		var result: any = Sync.promise(this.context, this.context.findOne, query, options);
		return (result!==null)? this.getData(result) : null;
	}
	
	/**
	 * Atomically creates and returns a single document if it does not exist in the collection.
	 * @param {any} data - Data to use as criteria to find the document or save in the collection.
	 * @return {T}
	 */
	public findOrCreate(data: any): T {
		var update: any = { $set: this.map.prepareToInput(data) };
		var options = { "new": true, "upsert": true };
		return this.findAndModify(data, [], update, options);
	}
	
	/**
	 * Saves a document into a collection.
	 * @param {T} obj - A document to insert into the collection.
	 * @return {any}
	 */
	public save(obj: T): T {
		var data: any = this.map.prepareToInput(obj);
		var saveOperation: any = Sync.promise(this.context, this.context.insert, data);
		return (saveOperation.ops.length>0)? this.getData(saveOperation.ops[0]) : null;
		// Workaround. Need to fix later
	}
	
	/**
	 * Modifies an existing document or documents in a collection.
	 * @param {any} criteria - The selection criteria for the update.
	 * @param {any} update - The modifications to apply.
	 * @param {any} options - Optional. A document that contains a set of options that controls the operation.
	 */
	public update(query: any, data: any, options: any={}): boolean {
		query = this.map.prepareToInput(query);
		data = this.map.prepareToInput(data);
		return Sync.promise(this.context, this.context.update, query, data, options).result.n > 0;
		//this.context.update(query, data, options, (error, output)=>{ if(error) throw error });
	}
	
	/**
	 * Removes documents from a collection.
	 * @param {any} params - Optional. Specifies deletion criteria using query operators.
	 * @param {boolean} justOne - Optional. To limit the deletion to just one document, set to true.
	 * @return {boolean}
	 */
	public remove(query: any = {}): boolean {
		query = this.map.prepareToInput(query);
		return Sync.promise(this.context, this.context.remove, query).result.n > 0;
	}
	
	/**
	 * Initializes and returns a new Bulk() operations builder for a collection. The builder constructs an ordered or unordered list of write operations that MongoDB executes in bulk depending on your choice.
	 * @param{boolean} ordered - Optional. Set to true to construct an ordered list of operations. Default value set to false.
	 * @return {IBulk<T>}
	 */
	public initBulk(ordered?: boolean, options?: any): IBulk<T> {
		var bulk: any = (ordered)? this.context.initializeOrderedBulkOp(options) : this.context.initializeUnorderedBulkOp(options);
		return new MongoBulk<T>(bulk, this.map); 
	}
}
export = MongoCollection;
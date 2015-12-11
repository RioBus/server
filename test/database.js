'use strict';
/* global describe, it, before; */

const Assert = require('assert');
const Database = require('../src/core').Database;

describe('Database', () => {
	
	var db, collection;
	
	it('should connect to database', function*() {
		db = yield Database.connect();
		Assert.notEqual(db, null);
	});
	
	it('should access the collection test', function*() {
		collection = db.collection('test');
		Assert.notEqual(collection, null);
	});
	
	it('should insert data in the collection', function*() {
		yield collection.insert({ name: 'Fulano' });
		
		var item = yield collection.findOne({ name: 'Fulano' });
		Assert.equal(item.name, 'Fulano');
	});
	
	it('should update Fulano in the collection', function*() {
		var item = yield collection.findOne({ name: 'Fulano' });
		item.name = 'Ciclano';
		yield item.save();
		Assert.equal(item.name, 'Ciclano');
	});
	
	it('should retrieve all documents in test collection', function*() {
		var items = yield collection.find({});
		Assert.notEqual(items.length, 0);
	});
	
	it('should remove all documents in test collection', function*() {
		yield collection.remove({});
		var items = yield collection.find({});
		Assert.equal(items.length, 0);
	});
});
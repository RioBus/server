'use strict';
/* global describe, it, before, global, __dirname, after; */
const base = `${__dirname}/../../src`;

const Assert = require('assert');
const Database = require(`${base}/core`).Database;
const Bus = require(`${base}/bus/busModel`);
const BusDAO = require(`${base}/bus/busDAO`);

var dao, saved, col;

describe('BusDAO', () => {
	
	before(function*() {
		let conn = yield Database.connect();
		col = conn.collection('bus');
		dao = new BusDAO(conn);
		saved = yield col.insert(new Bus('line', 'order', 0, 0, 23, 45, (new Date()).toDateString(), 'sense'));
	});
	
	it('should find all buses from the collection', function*() {
		let data = yield dao.getAll();
		Assert(data instanceof Array);
		Assert.equal(data.length, 1);
	});
	
	it('should find all buses with the line equal to \'line\'', function*() {
		let data = yield dao.getByLines([saved.line]);	
		Assert(data instanceof Array);
		Assert.equal(data.length, 1);
	});
	
	it('should find all buses with the order equal to \'order\'', function*() {
		let data = yield dao.getByOrders([saved.order]);	
		Assert(data instanceof Array);
		Assert.equal(data.length, 1);
	});
	
	after(function*() {
		yield col.remove({});
	});
});
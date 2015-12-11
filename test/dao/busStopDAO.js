'use strict';
/* global describe, it, before, global, __dirname, after; */
const base = `${__dirname}/../../src`;

const Assert     = require('assert');
const Database   = require(`${base}/core`).Database;
const BusStop    = require(`${base}/busStop/busStopModel`);
const BusStopDAO = require(`${base}/busStop/busStopDAO`);

let dao, saved, col;

describe('BusStopDAO', () => {
	
	before(function*() {
		let conn = yield Database.connect();
		col = conn.collection('busStop');
		dao = new BusStopDAO(conn);
		saved = yield col.insert(new BusStop('line', 'description', 'agency', []));
	});
	
	it('should find all the busStops', function*() {
		let busStop = yield dao.getAll();
		Assert(busStop instanceof Array);
		Assert.notEqual(busStop.length, 0);
	});
		
	it('should find the busStop with the line equal to \'line\'', function*() {
		let busStop = yield dao.getByLine(saved.line);
		Assert.equal(busStop.line, saved.line);
	});
		
	after(function*() {
		yield col.remove({});
	});
});
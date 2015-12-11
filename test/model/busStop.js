'use strict';
/* global describe, it, before; */

const Assert = require('assert');

const base = '../../src';
const BusStop = require(`${base}/busStop/busStopModel`);

describe('BusStop', () => {
	
	let busStop;
	
	before(() => {
		busStop = new BusStop('line', 'description', 'agency', []);
	});
	
	it('should have a property \'line\' containing a string', () => {
		Assert.equal(typeof busStop.line, 'string');
	});
	
	it('should have a property \'description\' containing a string', () => {
		Assert.equal(typeof busStop.description, 'string');
	});
	
	it('should have a property \'agency\' containing a string', () => {
		Assert.equal(typeof busStop.agency, 'string');
	});
	
	it('should have a property \'spots\' containing an Array', () => {
		Assert.equal(busStop.spots instanceof Array, true);
	});
});
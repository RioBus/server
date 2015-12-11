'use strict';
/* global describe, it, before; */

const Assert = require('assert');

const base = '../../src';
const Bus = require(`${base}/bus/busModel`);

describe('Bus', () => {
	
	let bus;
	
	before( () => {
		bus = new Bus('line', 'order', 0, 1, 2, 3, new Date(), 'sense');
	});
	
	it('should have a property \'line\' containing a string', () => {
		Assert.equal(typeof bus.line, 'string');
	});
	
	it('should have a property \'order\' containing a string', () => {
		Assert.equal(typeof bus.order, 'string');
	});
	
	it('should have a property \'sense\' containing a string', () => {
		Assert.equal(typeof bus.sense, 'string');
	});
	
	it('should have a property \'timestamp\' containing a Date', () => {
		Assert.equal(typeof bus.timestamp.getMonth, 'function');
	});
	
	it('should have a property \'speed\' containing a number', () => {
		Assert.equal(typeof bus.speed, 'number');
	});
	
	it('should have a property \'direction\' containing a number', () => {
		Assert.equal(typeof bus.direction, 'number');
	});
	
	it('should have a property \'latitude\' containing a number', () => {
		Assert.equal(typeof bus.latitude, 'number');
	});
	
	it('should have a property \'longitude\' containing a number', () => {
		Assert.equal(typeof bus.longitude, 'number');
	});
});
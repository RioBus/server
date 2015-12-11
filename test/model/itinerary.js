'use strict';
/* global describe, it, before; */

const Assert = require('assert');

const base = '../../src';
const Itinerary = require(`${base}/itinerary/itineraryModel`);

describe('Itinerary', () => {
	
	let itinerary;
	
	before( () => {
		itinerary = new Itinerary('line', 'description', 'agency', 'keywords', []);
	});
	
	it('should have a property \'line\' containing a string', () => {
		Assert.equal(typeof itinerary.line, 'string');
	});
	
	it('should have a property \'description\' containing a string', () => {
		Assert.equal(typeof itinerary.description, 'string');
	});
	
	it('should have a property \'agency\' containing a string', () => {
		Assert.equal(typeof itinerary.agency, 'string');
	});
	
	it('should have a property \'keywords\' containing a string', () => {
		Assert.equal(typeof itinerary.keywords, 'string');
	});
	
	it('should have a property \'spots\' containing an Array', () => {
		Assert.equal(itinerary.spots instanceof Array, true);
	});
});
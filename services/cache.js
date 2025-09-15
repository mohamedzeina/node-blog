const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget); // Promisify hget for async/await usage

const exec = mongoose.Query.prototype.exec; // Save reference to original exec function

mongoose.Query.prototype.cache = function (options = {}) {
	this.enableCache = true; // Set a flag to indicate that we want to use caching
	this.topHashKey = JSON.stringify(options.key || ''); // Optional top-level key for namespacing
	return this; // Return the query object for chaining
};

mongoose.Query.prototype.exec = async function () {
	if (!this.enableCache) {
		return exec.apply(this, arguments); // If caching is not enabled, call original exec function
	}

	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name,
		})
	); // Create a unique key for the query

	// Check if we have a cached value for this key
	const cacheValue = await client.hget(this.topHashKey, key);

	// If we do, return that
	if (cacheValue) {
		const document = JSON.parse(cacheValue); // Parse the cached JSON string

		return Array.isArray(document)
			? document.map((d) => new this.model(d)) //
			: new this.model(document); // Return mongoose documents
	}

	// Otherwise, issue the query and store the result in redis
	const result = await exec.apply(this, arguments); // Call original exec function with original arguments

	client.hset(this.topHashKey, key, JSON.stringify(result), 'EX', 10); // Cache the result
	return result;
};

module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey)); // Function to clear cache for a specific key
	},
};

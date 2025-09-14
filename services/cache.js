const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get); // Promisify hget for async/await usage

const exec = mongoose.Query.prototype.exec; // Save reference to original exec function

mongoose.Query.prototype.exec = async function () {
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name,
		})
	); // Create a unique key for the query

	// Check if we have a cached value for this key
	const cacheValue = await client.get(key);

	// If we do, return that
	if (cacheValue) {
		console.log(cacheValue);
	}

	// Otherwise, issue the query and store the result in redis
	const result = await exec.apply(this, arguments); // Call original exec function with original arguments
	console.log(result);
};

const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec; // Save reference to original exec function

mongoose.Query.prototype.exec = function () {
	const key = Object.assign({}, this.getQuery(), {
		collection: this.mongooseCollection.name,
	}); // Create a unique key for the query

	return exec.apply(this, arguments); // Call original exec function with original arguments
};

const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec; // Save reference to original exec function

mongoose.Query.prototype.exec = function () {
	console.log('Qeury will be executed');

	return exec.apply(this, arguments); // Call original exec function with original arguments
};

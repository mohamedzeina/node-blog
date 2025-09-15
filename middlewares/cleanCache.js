const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
	await next(); // Wait for the request to be processed first
	clearHash(req.user.id); // Clear the cache for this user
};

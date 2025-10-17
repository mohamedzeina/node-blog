require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
<<<<<<< HEAD
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

afterAll(async () => {
  await mongoose.disconnect();
=======
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

afterAll(async () => {
	await mongoose.disconnect();
>>>>>>> 1c1bfb23149633364e87db9860d1fb7ae771516f
});

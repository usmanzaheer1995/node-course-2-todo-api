var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //tell mongoose which promise library to use
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose,
}
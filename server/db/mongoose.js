var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //tell mongoose which promise library to use
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose,
}
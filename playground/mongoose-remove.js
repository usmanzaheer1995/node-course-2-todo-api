const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const { Users } = require('./../server/models/Users');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({ _id: "58e0a1a302ce641908bf90ad" }).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove("58e0a1a302ce641908bf90ad").then((todo) => {
//     console.log(todo);
// });
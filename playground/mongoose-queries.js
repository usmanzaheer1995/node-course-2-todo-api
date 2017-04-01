const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const {Users} = require('./../server/models/Users');

var id = '58de40aee9da0e0e9c0b9c50';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid.');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos: ", todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("Todo: ", todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found.');
//     }
//     console.log('Todo by id: ', todo);
// }).catch((err) => {
//     console.log(err);
// });

Users.find({
    _id: id
}).then((users) => {
    console.log('Users: ', users);
});

Users.findOne({
    _id:id
}).then((user) => {
    console.log(JSON.stringify(user,undefined,2));
});

Users.findById(id).then((user) => {
    if(!user){
        return console.log("Unable to find ID.");
    }
    console.log(JSON.stringify(user,undefined,2));
}).catch((err)=>{
    console.log(err);
});
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');   //destructuring in ES6

// var obj = new ObjectID();
// console.log(obj);

// var user = {
//     name:"Usman",
//     age:22,
// };

//destructuring objects. This will pull the name out of user variable
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err)
    {
        return console.log("Unable to mongo db server.");
    }
    console.log('Connected to mongo db server.');

    //.toArray is a promise
    // db.collection('Todos').find({
    //     _id: new ObjectID('58db944c53296d25acdc28c2'),  //can't call _id: 'id' as _id is an object, not a string
    // }).toArray().then((docs) => {
    //     console.log("Todos: ");
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, (err) => {
    //     console.log("Unable to fetch from Todos collection.",err);
    // });

    // db.collection('Todos').find({}).count().then((count) => {
    //     console.log(`Count of collection Todos is ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch count from Todos collection.",err);
    // });

    db.collection('Users').find({name:'Ahmad'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('Unable to fetch data from Users collection.',err);
    });

    //db.close();
});
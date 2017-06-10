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

    db.collection('Todos').insertOne({
        text: 'something',
        completed: 'false',
    }, (err, result) => {
        if(err)
        {
            return console.log('Unable to insert todo',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    // db.collection('Users').insertOne({
    //     name: 'Usman',
    //     age: 22,
    //     location: 'Scheme 3',
    // }, (err,result) => {
    //     if(err)
    //     {
    //         return console.log('Unable to insert to db', err);
    //     }
    //     //result.ops store all the returned values of our document
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // });


    db.close();
});
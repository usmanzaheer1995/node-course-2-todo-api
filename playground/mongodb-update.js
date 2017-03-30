const {MongoClient, ObjectID} = require('mongodb');   //destructuring in ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err)
    {
        return console.log("Unable to mongo db server.");
    }
    console.log('Connected to mongo db server.');

    //3 arguments. filter,update,options and then a callback function which in our case is a promise
    // db.collection('Todos').findOneAndReplace({
    //     _id: new ObjectID('58dc824b888515663b34ea09'),
    // },
    // {
    //     //to change values
    //     $set: {
    //         completed:'true',
    //     }
    // },
    // {
    //     returnOriginal: false,  //this returns the new document instead of the original one. By default this is true, so we set it to false
    // }
    // ).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name:'Hamza',
    },
    {
        $set: {
            name: 'Usman'
        },
        $inc: {
            age: 2
        },   
    },
    {
        returnOriginal:false,
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});
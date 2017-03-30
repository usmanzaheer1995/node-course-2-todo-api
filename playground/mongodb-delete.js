const {MongoClient, ObjectID} = require('mongodb');   //destructuring in ES6

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err)
    {
        return console.log("Unable to mongo db server.");
    }
    console.log('Connected to mongo db server.');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // } /*only succcess case)*/);

    //deleteOne
    // db.collection('Todos').deleteOne({text:'eat lunch'}).then((result) =>{
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:'false'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({name:'Ahmad'}).then((result) => {
        console.log(result);
    });

    //db.close();
});
require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Users } = require('./models/Users');
var { Todo } = require('./models/Todo');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    //console.log(request.body);
    var todo = new Todo({
        text: request.body.text,
    });

    todo.save().then((doc) => {
        response.send(doc);
    }, (err) => {
        response.status(400).send(err);
    });
});

app.get('/todos', (request, response) => {
    Todo.find().then((todos) => {
        response.send({ todos })
    }, (err) => {
        if (err) {
            response.status(400).send(err);
        }
    });
});

app.get('/todos/:id', (request, response) => {
    //request.params()
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send({ todo });
    }, (err) => {
        response.status(404).send();
    });
    //response.send(request.params);
});

app.delete('/todos/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return response.status(404).send();
        }
        response.send({ doc });
    }, (err) => {
        response.status(404).send();
    });
})

//to update a resource, we use patch
app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;

    //to specify which properties the user can update in the model
    var body = _.pick(request.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = 'false';
        body.completedAt = null; 
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) => {
        if(!todo){
            return response.status(404).send();
        }
        response.send({todo});
    }).catch((err)=>{
        response.status(400).send(err);
    });
        
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
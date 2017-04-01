var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Users } = require('./models/Users');
var { Todo } = require('./models/Todo');

var app = express();

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

app.listen(3000, () => {
    console.log("Started on port 3000");
});

module.exports = { app };
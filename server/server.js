require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Users } = require('./models/Users');
var { Todo } = require('./models/Todo');
var { authenticate } = require('./middleware/authenticate')

var app = express();
const port = process.env.port;

app.use(bodyParser.json());

app.post('/todos', authenticate, (request, response) => {
    //console.log(request.body);
    var todo = new Todo({
        text: request.body.text,
        _creator: request.user._id
    });

    todo.save().then((doc) => {
        response.send(doc);
    }, (err) => {
        response.status(400).send(err);
    });
});

app.get('/todos',authenticate,(request, response) => {
    Todo.find({
        _creator: request.user._id
    }).then((todos) => {
        response.send({ todos })
    }, (err) => {
        if (err) {
            response.status(400).send(err);
        }
    });
});

app.get('/todos/:id', authenticate, (request, response) => {
    //request.params()
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: request.user._id,
    }).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send({ todo });
    }, (err) => {
        response.status(404).send();
    });
    //response.send(request.params);
});

app.delete('/todos/:id', authenticate, (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: request.user._id,
    }).then((doc) => {
        if (!doc) {
            return response.status(404).send();
        }
        response.send({ doc });
    }, (err) => {
        response.status(404).send();
    });
})

//to update a resource, we use patch
app.patch('/todos/:id', authenticate, (request, response) => {
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

    Todo.findOneAndUpdate({_id: id, _creator:request.user._id}, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send({ todo });
    }).catch((err) => {
        response.status(400).send(err);
    });

});

app.post('/users', (request, response) => {
    let body = _.pick(request.body, ['email', 'password'])
    let user = new Users(body)

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        //x- generates a custom header
        response.header('x-auth', token).send(user)

    }).catch((err) => {
        response.status(400).send(err)
    })
})

//middleware
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

app.post('/users/login', (request, response) => {
    let body = _.pick(request.body, ['email', 'password'])

    Users.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            response.header('x-auth', token).send(user)
        })
    }).catch((err) => {
        response.status(400).send()
    })
})

app.delete('/users/me/token', authenticate, (request,resonse) => {
    
    request.user.removeToken(request.token).then(()=>{
        response.status(200).send()
    }, () => {
        response.status(400).send()
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
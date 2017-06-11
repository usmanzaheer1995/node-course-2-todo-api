const {ObjectId} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/Todo')
const {Users} = require('./../../models/Users')

const userOneId = new ObjectId()
const userTwoId = new ObjectId()
const users = [{
    _id: userOneId,
    email: 'usman@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId,access:'auth'}, 'abc123').toString()
    }]
},{
    _id: userTwoId,
    email: 'andrew@example.com',
    password: 'userTwoPas',
}]

const todos = [{
    _id: new ObjectId(),
    text: "First test todo"
}, {
    _id: new ObjectId(),
    text: "Second test todo",
    completed: true,
    completedAt: 333,
}];

const populateTodos = (done) => {
    //before each test case runs, beforeEach will run
    //in this case, we are removing everything from Todos collection in mongo db before each test
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);

    }).then(() => {
        done();
    });
}

const populateUsers = (done) => {
    Users.remove({}).then(() => {
        let userOne = new Users(users[0]).save()
        let userTwo = new Users(users[1]).save()

        return Promise.all([userOne,userTwo])
    }).then(() => done())
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers,
}
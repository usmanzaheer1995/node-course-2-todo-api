const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

var { app } = require('./../server');
var { Todo } = require('./../models/Todo');

const todos = [{
    _id: new ObjectId(),
    text: "First test todo"
}, {
    _id: new ObjectId(),
    text: "Second test todo"
}];

beforeEach((done) => {
    //before each test case runs, beforeEach will run
    //in this case, we are removing everything from Todos collection in mongo db before each test
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);

    }).then(() => {
        done();
    });
});

describe('POST /Todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((err, response) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should not create todo within invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, response) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
         .get('/todos')
         .expect(200)
         .expect((response) => {
             expect(response.body.todos.length).toBe(2)
         })
         .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return /todo doc', (done) => {
        request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`)
         .expect(200)
         .expect((response) => {
             expect(response.body.todo.text).toBe(todos[0].text);
         })
         .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectId();
        request(app)
         .get(`/todos/${id.toHexString()}`)
         .expect(404)
         .end(done);
    });

    it('should return 404 for non-object id', (done) => {
        request(app)
         .get(`/todos/123`)
         .expect(404)
         .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        //console.log(todos[1]._id);
        request(app)
         .delete(`/todos/${hexId}`)
         .expect(200)
        //  .expect((response) => {
        //     expect(response.body.todo._id).toBe(hexId);
        //  })
         .end((err,response) => {
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e));
         });
    });

    it('should return 404 is todo not found', (done) => {
         var id = new ObjectId();
        request(app)
         .delete(`/todos/${id.toHexString()}`)
         .expect(404)
         .end(done);
    });

    it('should return 404 if ObjectId is invalid', (done)=>{
        request(app)
         .delete(`/todos/123`)
         .expect(404)
         .end(done);
    });
});
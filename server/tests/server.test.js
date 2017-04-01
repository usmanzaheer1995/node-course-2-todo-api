const expect = require('expect');
const request = require('supertest');

var { app } = require('./../server');
var { Todo } = require('./../models/Todo');

const todos = [{
    text: "First test todo"
}, {
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
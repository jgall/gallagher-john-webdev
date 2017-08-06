(function () {
    'use strict';

    let assert = require('assert');
    let request = require('supertest');
    let describe = require("mocha").describe;
    let beforeEach = require("mocha").beforeEach;
    let afterEach = require("mocha").afterEach;

    let users = [
        {username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    let createdUsers = [];

    let websites = [
        {"name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"name": "Go", "developerId": "123", "description": "Lorem"},
        {"name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    let pages = [
        {"name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    let widgets = [
        {"widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        {"widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {"widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
        {"widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    describe("User Service", function () {
        let server;
        beforeEach(function (done) {
            server = require("../server");
            Promise.all(users.map(u => request(server).post('/api/user').send(u))).then(users => {
                createdUsers = [];
                users.forEach(u => createdUsers.push(u.body));
                console.log(createdUsers);
                done();
            });
        });
        afterEach(function (done) {
            Promise.all(createdUsers.map(u => request(server).delete('/api/user/' + u._id)))
                .then(() => {
                    server.close();
                    done();
                });
        });

        it('finds users by id', function testGetUserById(done) {
            Promise.all(createdUsers.map((u) => request(server)
                .get('/api/user/' + u._id)
                .expect((user) => {
                    assert.deepEqual(user.body, u);
                }))).then(() => done());
        });

        it('finds users by username', function testGetUserById(done) {
            request(server)
                .get('/api/user/?username=' + createdUsers[0].username)
                .expect(createdUsers[0], done);
        });

        it("finds user by credentials", function testGetUserByCredentials(done) {
            request(server)
                .get('/api/user/?username=' + createdUsers[0].username + '&password=' + createdUsers[0].password)
                .expect(createdUsers[0], done);
        });

        describe('Creating users', function () {
            let server;
            beforeEach(function () {
                server = require("../server");
            });
            afterEach(function () {
                server.close();
            });
            it('creates a new user', function testCreateNewUser(done) {
                request(server)
                    .post('/api/user')
                    .send({
                        username: "john",
                        password: "john",
                        firstName: "John",
                        lastName: "Gallagher"
                    })
                    .expect(200, done)
                    .expect(function (res) {
                        assert.equal(res.body.username, "john");
                        assert.equal(res.body.password, "john");
                        assert.equal(res.body.firstName, "John");
                        assert.equal(res.body.lastName, "Gallagher");
                    });
            });
        });

        describe('Updating a user', function () {
            it('updates a user', function testUpdateUser(done) {
                request(server)
                    .put('/api/user/' + createdUsers[3]._id)
                    .send({
                        username: "newUsername",
                        password: "alice",
                        firstName: "Alice",
                        lastName: "new last name"
                    })
                    .expect(200)
                    .end((err, res) => {
                        request(server).get('/api/user/' + createdUsers[3]._id)
                            .expect({
                                _id: createdUsers[3]._id,
                                username: "newUsername",
                                password: "alice",
                                firstName: "Alice",
                                lastName: "new last name"
                            })
                            .end((err, res) => {
                                assert.equal(res.body._id, createdUsers[3]._id);
                                assert.equal(res.body.username, "newUsername");
                                assert.equal(res.body.lastName, "new last name");
                                done()
                            });
                    });
            });
        });

        it('deletes a user', function testDeleteUser(done) {
            request(server)
                .delete('/api/user/' + createdUsers[2]._id)
                .expect(200)
                .end(function (err, res) {
                    request(server).get('/api/user/' + createdUsers[2]._id)
                        .expect(404).end((err, res) => {
                        createdUsers.splice(2, 1);
                        done();
                    });
                });
        });
    });
})();
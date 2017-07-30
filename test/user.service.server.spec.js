'use strict';

let assert = require('assert');
let request = require('supertest');
let describe = require("mocha").describe;
let beforeEach = require("mocha").beforeEach;
let afterEach = require("mocha").afterEach;

describe("User Service", function () {
    let server;
    beforeEach(function () {
        server = require("../server");
    });
    afterEach(function () {
        server.close();
    });

    it('finds users by id', function testGetUserById(done) {
        request(server)
            .get('/api/user/123')
            .expect({_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"}, done);
    });

    it('finds users by username', function testGetUserById(done) {
        request(server)
            .get('/api/user/?username=bob')
            .expect({_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"}, done);
    });

    it("finds user by credentials", function testGetUserByCredentials(done) {
        request(server)
            .get('/api/user/?username=alice&password=alice')
            .expect({_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"}, done);
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
                    _id: "none",
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
                .put('/api/user/123')
                .send({_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "new last name"})
                .expect(200)
                .end((err, res) => {
                    request(server).get('/api/user/123')
                        .expect({
                            _id: "123",
                            username: "alice",
                            password: "alice",
                            firstName: "Alice",
                            lastName: "new last name"
                        })
                        .end((err, res) => {
                            assert.equal(res.body._id, "123");
                            assert.equal(res.body.username, "alice");
                            assert.equal(res.body.lastName, "new last name");
                            done()
                        });
                });
        });
    });


    it('deletes a user', function testDeleteUser(done) {
        request(server)
            .delete('/api/user/123')
            .expect(200)
            .end(function (err, res) {
                request(server).get('/api/user/123')
                    .expect(404, done);
            });
    });
});



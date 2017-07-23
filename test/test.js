let assert = require('assert');
let request = require('supertest');
let describe = require("mocha").describe;
let beforeEach = require("mocha").beforeEach;
let afterEach = require("mocha").afterEach;
describe('Initialize Tests', function () {
    it('This test should always get run and should always pass: ', function () {
        assert.equal(-1, [1, 2, 3].indexOf(4));
    });
});

describe("Normal Server Functionality", function () {
    let server;
    beforeEach(function () {
        server = require("../server");
    });
    afterEach(function () {
        server.close();
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
});

describe("User Service : Server", function () {
    let server;
    beforeEach(function () {
        server = require("../server");
    });
    afterEach(function () {
        server.close();
    });

    it('gets users by id', function testGetUserById(done) {
        request(server)
            .get('/api/user/123')
            .expect({_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"}, done);
    });

    it('gets users by username', function testGetUserById(done) {
        request(server)
            .get('/api/user/?username=bob')
            .expect({_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"}, done);
    });
});



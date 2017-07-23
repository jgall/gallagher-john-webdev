let assert = require('assert');
let request = require('supertest');
let describe = require("mocha").describe;
let beforeEach = require("mocha").beforeEach;
let afterEach = require("mocha").afterEach;
describe('Initialize Tests', function () {
    it('should always get run and should always pass: ', function () {
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



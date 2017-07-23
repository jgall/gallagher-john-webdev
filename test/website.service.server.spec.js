/**
 * Created by jggll on 7/23/17.
 */
let assert = require('assert');
let request = require('supertest');
let describe = require("mocha").describe;
let beforeEach = require("mocha").beforeEach;
let afterEach = require("mocha").afterEach;

describe("Website Service", function () {
    let server;
    beforeEach(function () {
        server = require("../server");
    });
    afterEach(function () {
        server.close();
    });

    it('finds websites for user', function testGetWebsitesForUser(done) {
        request(server)
            .get('/api/user/123/website')
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.length, 3);
                assert.deepEqual(res.body[0], {
                    "_id": "890",
                    "name": "Go",
                    "developerId": "123",
                    "description": "Lorem"
                });
                done();
            });
    });

    it('creates a website', function testCreateWebsite(done) {
        request(server)
            .post('/api/user/123/website')
            .send({"name": "testWebsite1", "developerId": "123", "description": "Lorem"})
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.name, "testWebsite1");
                request(server)
                    .get('/api/user/123/website')
                    .expect(200)
                    .end((err, res) => {
                        assert.equal(res.body[3].name, "testWebsite1");
                        done();
                    });
            });
    });
});
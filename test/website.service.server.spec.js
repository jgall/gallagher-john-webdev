/**
 * Created by jggll on 7/23/17.
 */
'use strict';

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

    describe('finding websites by id', function() {
        let server;
        beforeEach(function () {
            server = require("../server");
        });
        afterEach(function () {
            server.close();
        });
        it('finds a website by id', function testFindWebsiteById(done) {
            request(server)
                .get('/api/website/678')
                .expect(200)
                .end((err, res) => {
                    assert.deepEqual(res.body, {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"});
                    done();
                });
        });

        it('404s on finding websites that do not exist', function testFindNonExistentWebsite(done) {
            request(server)
                .get('/api/website/241523')
                .expect(404, done);
        });
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

    it('updates a website', function testUpdateWebsite(done) {
        request(server).put('/api/website/123')
            .send({"_id": "123", "name": "Facebook2", "developerId": "456", "description": "Lorem"})
            .expect(200)
            .end((err, res) => {
                request(server)
                    .get('/api/website/123')
                    .expect(200)
                    .end((err, res) => {
                        assert.deepEqual(res.body, {
                            "_id": "123",
                            "name": "Facebook2",
                            "developerId": "456",
                            "description": "Lorem"
                        });
                        done();
                    });
            })
    })
});
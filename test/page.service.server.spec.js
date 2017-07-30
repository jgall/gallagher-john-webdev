(function() {
    'use strict';

    let assert = require('assert');
    let request = require('supertest');
    let describe = require("mocha").describe;
    let beforeEach = require("mocha").beforeEach;
    let afterEach = require("mocha").afterEach;

    describe('Page Service', function () {
        let server;
        beforeEach(function () {
            server = require("../server");
        });
        afterEach(function () {
            server.close();
        });

        describe('finds pages by id', function () {
            let server;
            beforeEach(function () {
                server = require("../server");
            });
            afterEach(function () {
                server.close();
            });

            it('id: 321', function testFindsPagesById(done) {
                request(server)
                    .get('/api/page/321')
                    .expect(200)
                    .expect({"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"}, done);
            });

            it('id: 432', function testFindsPagesById(done) {
                request(server)
                    .get('/api/page/432')
                    .expect(200)
                    .expect({"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"}, done);
            });

            it('404 error should occur', function testFindsPagesById(done) {
                request(server)
                    .get('/api/page/13423')
                    .expect(404, done);
            });
        });
    });
})();
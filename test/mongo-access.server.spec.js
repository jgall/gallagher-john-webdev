/**
 * Created by jggll on 7/30/17.
 */
(function() {
    'use strict';

    let assert = require('assert');
    let request = require('supertest');
    let describe = require("mocha").describe;
    let beforeEach = require("mocha").beforeEach;
    let afterEach = require("mocha").afterEach;

    describe('MongoDB', function() {
        let server;
        beforeEach(function () {
            server = require("../server");
        });
        afterEach(function () {
            server.close();
        });

        it('should be accessible', function(done) {
            let guid = new Date().getTime();
            request(server)
                .post('/api/test')
                .send({message: "Test Mongo Message at " + guid})
                .expect(200)
                .end((err, res) => {
                    request(server).get("/api/test").expect(200).end((err, res) => {
                        assert.deepEqual(!!res.body.find(m => m.message == "Test Mongo Message at " + guid), true);
                        request(server)
                            .delete("/api/test/" +
                                res.body.find(m => m.message == "Test Mongo Message at " + guid)._id)
                            .expect(200, done);
                    });
                });
        });

    });
})();

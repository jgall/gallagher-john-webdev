(function () {
    'use strict';

    let assert = require('assert');
    let request = require('supertest');
    let describe = require("mocha").describe;
    let beforeEach = require("mocha").beforeEach;
    let afterEach = require("mocha").afterEach;

    describe("User Model", function () {
        let server;
        let userModelApi;
        beforeEach(function () {
            server = require("../server");
            userModelApi = require("../assignment/model/user/user.model.server");

        });
        afterEach(function () {
            server.close();
        });
        it("creates, finds, and then deletes a user", function (done) {
            let guid = Date.now();
            userModelApi.createUser({
                username: "testUser" + guid,
                password: "test_user_password",
                firstName: "Alice",
                lastName: "Wonder",
            }).then((createdUser) => {
                userModelApi.findUserByUsername("testUser" + guid).then(user => {
                    assert.equal(user.password, "test_user_password");
                    userModelApi.removeUserById(createdUser._id).then(() => done());
                })
            }).catch(console.log);
        });

        it("handles non-existent users", function (done) {
            let guid = Date.now();
            userModelApi.findUserByUsername("nonexistent user " + guid).then(user => {
                assert.equal(user, null);
                done();
            })
        });
    });
})();
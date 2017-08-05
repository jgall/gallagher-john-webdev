(function () {
    'use strict';

    let assert = require('assert');
    let request = require('supertest');
    let describe = require("mocha").describe;
    let beforeEach = require("mocha").beforeEach;
    let afterEach = require("mocha").afterEach;

    describe("Website Model", function () {
        let server;
        let websiteModelApi;
        let userModelApi;
        beforeEach(function () {
            server = require("../server");
            websiteModelApi = require("../assignment/model/website/website.model.server");
            userModelApi = require("../assignment/model/user/user.model.server");
        });
        afterEach(function () {
            server.close();
        });
        it("adds created websites to user website list", function (done) {
            let guid = Date.now();
            userModelApi.createUser({
                username: "testUser" + guid,
                password: "test_user_password",
                firstName: "Alice",
                lastName: "Wonder",
            }).then((createdUser) => {
                websiteModelApi.createWebsiteForUser(createdUser._id, {
                    "name": "Facebook",
                    "developerId": "456",
                    "description": "Lorem"
                }).then(website => {
                    userModelApi.findUserByUsername("testUser" + guid).then(user => {
                        assert.deepEqual(user.websites[0], website._id);
                        return websiteModelApi.deleteWebsite(website).then(() => {
                            return userModelApi.findUserByUsername("testUser" + guid).then((user) => {
                                return userModelApi.removeUserById(createdUser._id).then(() => done());
                            });
                        });
                    }).catch(console.log);
                }).catch(console.log)
            }).catch(console.log);
        });
    });
})();
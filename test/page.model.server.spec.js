(function () {
    'use strict';

    let assert = require('assert');
    let request = require('supertest');
    let describe = require("mocha").describe;
    let beforeEach = require("mocha").beforeEach;
    let afterEach = require("mocha").afterEach;

    describe("Page Model", function () {
        let server;
        let websiteModelApi;
        let userModelApi;
        let pageModelApi;
        beforeEach(function () {
            server = require("../server");
            websiteModelApi = require("../assignment/model/website/website.model.server");
            userModelApi = require("../assignment/model/user/user.model.server");
            pageModelApi = require("../assignment/model/page/page.model.server");
        });
        afterEach(function () {
            server.close();
        });
        it("adds created pages to website page list", function (done) {
            let guid = Date.now();
            userModelApi.findAllUsers().then(users => Promise.all(users.map(u => userModelApi.removeUserById(u._id)))).then(() => {
                userModelApi.createUser({
                    username: "testUser" + guid,
                    password: "test_user_password",
                    firstName: "Alice",
                    lastName: "Wonder",
                }).then(user => websiteModelApi.createWebsiteForUser(user._id, {
                    "name": "Checkers",
                    "developerId": "123",
                    "description": "Lorem"
                }).then(website => pageModelApi.createPage(website._id, {
                    "name": "Post 3",
                    "websiteId": "456",
                    "description": "Lorem"
                }).then(page => userModelApi.removeUserById(user._id
                ).then(() => {
                    Promise.all([
                        //userModelApi.findAllUsers().then(users => Promise.all(users.map(u => userModelApi.removeUserById(u._id))))
                    ]).then(() => {
                        Promise.all([
                            userModelApi.findAllUsers().then(u => {
                                assert.deepEqual(u, []);
                            }),
                            websiteModelApi.findAllWebsites().then(w => {
                                assert.deepEqual(w, []);
                            }),
                            pageModelApi.findAllPages().then((p) => {
                                assert.deepEqual(p, []);
                            }),
                        ]).then(() => done())
                    });
                }))));
            });
        });
    });
})();
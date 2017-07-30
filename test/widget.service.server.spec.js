/**
 * Created by jggll on 7/24/17.
 */
(function () {
    'use strict';

    let assert = require('assert');
    let request = require('supertest');
    let describe = require("mocha").describe;
    let beforeEach = require("mocha").beforeEach;
    let afterEach = require("mocha").afterEach;

    describe('Widget Service', function () {
        let server;
        beforeEach(function () {
            server = require("../server");
        });
        afterEach(function () {
            server.close();
        });

        it('finds a widget by id', function (done) {
            request(server)
                .get('/api/widget/123')
                .expect(200)
                .expect({"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"}, done);
        });

        it('reorders widgets', function (done) {
            request(server)
                .put('/page/321/widget?initial=1&final=0')
                .expect(200)
                .end((err, res) => {
                    request(server)
                        .get('/api/page/321/widget')
                        .expect([
                            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                            {
                                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                                "url": "http://lorempixel.com/400/200/"
                            },
                            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                            {
                                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                                "url": "https://youtu.be/AM2Ivdi9c4E"
                            },
                            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
                        ], done);
                });
        })
    });
})();

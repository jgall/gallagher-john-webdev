/**
 * Created by jggll on 7/21/17.
 */
module.exports = function (app) {
    'use strict';

    const pageDbApi = require("../model/page/page.model.server");

    let pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        pageDbApi.createPage(req.params.websiteId, req.body).then(p => {
            res.json(p);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function findAllPagesForWebsite(req, res) {
        pageDbApi.findAllPagesForWebsite(req.params.websiteId).then(pages => {
            res.json(pages);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function findPageById(req, res) {
        pageDbApi.findPageById(req.params.pageId).then(p => {
            res.json(p);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function updatePage(req, res) {
        pageDbApi.updatePage(req.params.pageId, req.body).then(page => {
            res.status(200);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function deletePage(req, res) {
        pageDbApi.deletPage(req.params.pageId).then(p => {
            res.status(200);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

};

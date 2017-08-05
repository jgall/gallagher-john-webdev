/**
 * Created by jggll on 7/21/17.
 */
module.exports = function (app) {
    'use strict';

    const websiteDbApi = require("../model/website/website.model.server");

    let websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        websiteDbApi.createWebsiteForUser(req.params.userId, req.body).then(website => {
            res.json(website);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function findAllWebsitesForUser(req, res) {
        websiteDbApi.findAllWebsitesForUser(req.params.userId).then(websites => {
            res.json(websites);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function findWebsiteById(req, res) {
        websiteDbApi.findWebsiteById(req.params.websiteId).then(w => {
            res.json(w);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function updateWebsite(req, res) {
        websiteDbApi.updateWebsite(req.params.websiteId, req.body).then(w => {
            res.status(200);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function deleteWebsite(req, res) {
        websiteDbApi.deleteWebsite(req.params.websiteId).then(() => {
            res.status(200);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

};
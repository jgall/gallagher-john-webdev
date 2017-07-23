/**
 * Created by jggll on 7/21/17.
 */
module.exports = function (app) {
    let apiName = '/api/website';

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
        let website = req.body;
        if (website.name && website.developerId) {
            website._id = new Date().getTime();
            websites.push(website);
            res.status(200);
            res.json(website);
        } else {
            res.status(500);
        }
        res.end();
    }

    function findAllWebsitesForUser(req, res) {
        let userId = req.params.userId;
        res.json(websites.filter(w => w.developerId == userId));
        res.end();
    }

    function findWebsiteById(req, res) {
        let id = req.params.websiteId;
        res.json(websites.find(w => w._id == id));
        res.end();
    }

    function updateWebsite(req, res) {
        let id = req.params.websiteId;
        let websiteToUpdate = websites.find(w => w._id == id);
        websites.splice(websites.indexOf(websiteToUpdate), 1, req.body);
        res.status(200);
        res.end();
    }

    function deleteWebsite(req, res) {
        let id = req.params.websiteId;
        let websiteToDelete = websites.find(w => w._id == id);
        websites.splice(websites.indexOf(websiteToDelete), 1);
        res.status(200);
        res.end();
    }

};
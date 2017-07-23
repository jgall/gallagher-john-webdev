/**
 * Created by jggll on 7/21/17.
 */
module.exports = function(app) {

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
        let page = req.body;
        let websiteId = req.params.websiteId;
        if (websiteId) {
            page.websiteId = websiteId;
            page._id = new Date().getTime();
            pages.push(page);
        } else {
            res.status(404);
        }
        res.end();
    }

    function findAllPagesForWebsite(req, res) {
        res.json(pages.filter(p => p.websiteId == res.params.websiteId));
        res.end();
    }

    function findPageById(req, res) {
        let pageId = req.params.pageId;
        let page = pages.find(p => p._id == pageId);
        if (page) {
            res.json(page);
        } else {
            res.status(404);
        }
        res.end();
    }

    function updatePage(req, res) {
        let id = req.params.pageId;
        let pageToUpdate = pages.find(p => p._id == id);
        if (pageToUpdate) {
            pages.splice(pages.indexOf(pageToUpdate), 1, req.body);
            res.status(200);
        } else {
            res.status(404)
        }
        res.end();
    }

    function deletePage(req, res) {
        let id = req.params.pageId;
        let pageToDelete = pages.find(p => p._id == id);
        if (pageToDelete) {
            pages.splice(pages.indexOf(pageToDelete), 1);
            res.status(200);
        } else {
            res.status(404)
        }
        res.end();
    }

};

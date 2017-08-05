/**
 * Created by jggll on 7/21/17.
 */
module.exports = function (app) {
    'use strict';

    const widgetDbApi = require("../model/widget/widget.model.server");

    const multer = require('multer');
    const upload = multer({dest: './public/uploads'});

    let widgets = [
        {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
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
    ];

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/page/:pageId/widget', reorderWidgets);
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function createWidget(req, res) {
        console.log("creating widget: " + req.body);
        widgetDbApi.createWidget(req.params.pageId, req.body).then(w => {
            res.json(w);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function findAllWidgetsForPage(req, res) {
        widgetDbApi.findAllWidgetsForPage(req.params.pageId).then(w => {
            res.json(w);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function findWidgetById(req, res) {
        widgetDbApi.findWidgetById(req.params.widgetId).then(w => {
            res.json(w);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function updateWidget(req, res) {
        widgetDbApi.updateWidget(req.params.widgetId, req.body).then(w => {
            res.json(w);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function deleteWidget(req, res) {
        widgetDbApi.deleteWidget(req.params.widgetId).then(w => {
            res.status(200);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function reorderWidgets(req, res) {
        let pageId = req.params.pageId;
        let initial = req.query.initial;
        let final = req.query.final;

        widgetDbApi.reorderWidget(req.params.pageId, initial, final).then(w => {
            res.status(200);
            res.end();
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.end();
        });
    }

    function uploadImage(req, res) {

        let widgetId = req.body.widgetId;
        let width = req.body.width;
        let myFile = req.file;

        let userId = req.body.userId;
        let websiteId = req.body.websiteId;
        let pageId = req.body.pageId;

        let originalname = myFile.originalname; // file name on user's computer
        let filename = myFile.filename;     // new file name in upload folder
        let path = myFile.path;         // full path of uploaded file
        let destination = myFile.destination;  // folder where file is saved to
        let size = myFile.size;
        let mimetype = myFile.mimetype;

        let callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        widgetDbApi.updateWidget(widgetId, {url: '/uploads/' + filename, width: width}).then(() => {
            res.redirect(callbackUrl);
        });
    }
};
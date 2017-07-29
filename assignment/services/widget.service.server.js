/**
 * Created by jggll on 7/21/17.
 */
module.exports = function (app) {

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
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function createWidget(req, res) {
        let widget = req.body;
        let pageId = req.params.pageId;
        if (pageId) {
            widget.pageId = pageId;
            widget._id = new Date().getTime();
            widgets.push(widget);
            res.status(200);
            res.json(widget);
        } else {
            res.status(404);
        }
        res.end();
    }

    function findAllWidgetsForPage(req, res) {
        res.json(widgets.filter(w => w.pageId == req.params.pageId));
        res.end();
    }

    function findWidgetById(req, res) {
        let widgetId = req.params.widgetId;
        let widget = widgets.find(w => w._id == widgetId);
        if (widget) {
            res.json(widget);
        } else {
            res.status(404);
        }
        res.end();
    }

    function updateWidget(req, res) {
        let id = req.params.widgetId;
        console.log("id: " + id);
        let widgetToUpdate = widgets.find(w => w._id == id);
        console.log(widgets);
        if (widgetToUpdate) {
            widgets.splice(widgets.indexOf(widgetToUpdate), 1, req.body);
            res.status(200);
        } else {
            res.status(404)
        }
        res.end();
    }

    function deleteWidget(req, res) {
        let id = req.params.widgetId;
        let widgetToDelete = widgets.find(w => w._id == id);
        if (widgetToDelete) {
            widgets.splice(widgets.indexOf(widgetToDelete), 1);
            res.status(200);
        } else {
            res.status(404)
        }
        res.end();
    }

    function reorderWidgets(req, res) {
        let pageId = req.params.pageId;
        let initial = req.query.initial;
        let final = req.query.final;
        // Insert widget at initial index into the final index;
        let widgetsForPage = widgets.filter(w => w.pageId == pageId);

        let widget = widgetsForPage[initial];
        let finalPositionWidget = widgetsForPage[final];

        moveInArray(widgets, widgets.indexOf(widget), widgets.indexOf(finalPositionWidget));
        res.status(200);
        res.end();
    }

    function moveInArray(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            let k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
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

        let widget = widgets.find(w => w._id == widgetId);
        widget.url = '/uploads/'+filename;
        widget.width = width;

        let callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
    }
};
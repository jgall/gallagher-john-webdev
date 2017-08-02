/**
 * Created by jggll on 7/30/17.
 */
(function () {
    'use strict';
    angular.module('WebAppMaker').controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, WidgetService, $location, $routeParams) {
        let vm = this;

        const userId = $routeParams.uid;
        const websiteId = $routeParams.wid;
        const pageId = $routeParams.pid;
        const widgetId = $routeParams.wgid;

        vm.searchPhotos = function (searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (data) {
                    data = data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        };

        vm.selectPhoto = function (photo) {
            let url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .updateWidget(widgetId, {url: url})
                .then(() => {
                    $location.path("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId)
                });
        }


    }

})();
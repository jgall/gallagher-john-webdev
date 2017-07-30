/**
 * Created by jggll on 7/30/17.
 */
(function() {
    'use strict';
    angular.module('WebAppMaker').controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController() {
        let vm = this;

        vm.searchPhotos = function(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    let data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        };

        //function selectPhoto(photo) {
        //    let url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        //    url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        //    WidgetService
        //        .updateWidget(widgetId, {url: url})
        //        .then(...);
        //}


    }

})();
/**
 * Created by jggll on 7/30/17.
 */
'use strict';
(function() {
    angular.module('WebAppMaker').factory("FlickrService", FlickrService);

    function FlickrService($http) {
        const key = "0a983ebce36774b4c54d92c9ab41a8d2";
        const urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        const api = {"searchPhotos": searchPhotos};

        return api;

        function searchPhotos(searchTerm) {
            let url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url).then(res => res.data);
        }

    }

})();
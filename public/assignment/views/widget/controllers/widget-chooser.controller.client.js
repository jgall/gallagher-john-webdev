/**
 * Created by jggll on 7/20/17.
 */
(function () {
    angular.module("WebAppMaker").controller("ChooseWidgetController", ChooseWidgetController);

    function ChooseWidgetController($scope, $routeParams, UserService, WebsiteService, $location, WidgetService) {
        let vm = this;
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.widgetId = $routeParams[":wgid"];

        vm.createWidget = createWidget;
        vm.toRegularString = toRegularString;

        function createWidget(type) {
            let widget = {widgetType : type};
            WidgetService.createWidget(vm.pageId, widget);
            $location.path("/user/" + vm.userId + "/website/" + vm.websiteId
                + "/page/" + vm.pageId + "/widget/" + widget._id);
        }

        function toRegularString(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.widgetTypes = WidgetService.getWidgetTypes();
        }
        init();
    }

})();
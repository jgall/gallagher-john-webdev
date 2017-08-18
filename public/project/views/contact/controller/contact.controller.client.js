(function () {
    angular.module("MealPlanner").controller("ContactController", ContactController);

    function ContactController(UserService, $window, currentUser) {
        const vm = this;

        vm.back = back;
        vm.addContact = addContact;
        vm.removeContact = removeContact;
        vm.removeIncomingContact = removeIncomingContact;
        vm.removeOutgoingContact = removeOutgoingContact;

        init();

        function init() {
            vm.user = currentUser;
            UserService.getIncomingContactRequests().then(data => vm.incomingRequests = data);
            UserService.getOutgoingContactRequests().then(data => vm.outgoingRequests = data);
            UserService.getContacts().then(data => vm.contacts = data);
        }

        function back() {
            $window.history.back();
        }

        function addContact(username) {
            UserService.requestContact(username).then(init);
        }

        function removeContact(c) {
            UserService.removeContact(c._id).then(init);
        }

        function removeIncomingContact(c) {
            UserService.removeIncomingContactRequest(c._id).then(init);
        }

        function removeOutgoingContact(c) {
            UserService.removeOutgoingContactRequest(c._id).then(init);
        }

    }
})();
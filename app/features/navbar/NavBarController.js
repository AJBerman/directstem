/**
 *  This controllers will display all the available link "tabs" to the
 *  user. en they click on a link, the controller will change the class
 *  to show that is active
 */
angular.module("WebserviceApp.Controllers")

    // "active" css class
    .constant("activeClass", "active")

    // changing a tab active class
    .controller("NavBarCtrl", function ($scope, activeClass) {
        $scope.options = [
            {name: "Project", url: "#project"},
            {name: "Graph", url: "#graph"},
            {name: "About", url: "#about"},
            {name: "Contact", url: "#contact"},
        ];

        var selectedOption = null;

        $scope.selectOption = function (option) {
            selectedOption = option;
        };

        $scope.getOptionClass = function (option) {
            return selectedOption == option ? activeClass : ""
        };
    })
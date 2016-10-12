/**
 *  This controllers will display all the available link "tabs" to the
 *  user. en they click on a link, the controller will change the class
 *  to show that is active
 */
var controllerModule = angular.module("WebserviceApp.Controllers");

// "active" css class
controllerModule.constant("activeClass", "active");

// changing a tab active class
controllerModule.controller("NavBarCtrl", function ($scope, activeClass) {
    $scope.options = [
        {name: "Home", url: "#home"},
        {name: "Project", url: "#project"},
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
});
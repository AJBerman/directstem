/**
 * Created by shay on 10/11/16.
 */

var controllerModule = Controller = angular.module("HelloWorld.Controllers");

controllerModule.controller("HelloWorldCtrl", function ($scope) {
    $scope.message = "hello world";
});

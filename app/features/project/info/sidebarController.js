/**
 * Created by shay on 10/12/16.
 */

angular.module("WebserviceApp.Controllers")

    .controller("SidebarCtrl", function ($scope, activeClass) {
        $scope.options = [
            {name: "Overview", url: "components/data/fake.html"},
            {name: "Reports", url: ""},
            {name: "Analytic", url: ""},
            {name: "History", url: ""}
        ];

        $scope.selectedOption = $scope.options[0];

        $scope.selectOption = function (option) {
            $scope.selectedOption = option;
        };

        $scope.getOptionClass = function (option) {
            return $scope.selectedOption.name == option.name ? activeClass : "";
        }
    });

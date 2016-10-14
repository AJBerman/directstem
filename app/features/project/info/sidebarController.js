/**
 * Created by shay on 10/12/16.
 */

angular.module("WebserviceApp.Controllers")

    .controller("SidebarCtrl", function ($scope, activeClass, SidebarFactory) {
        $scope.sidebarOptions = SidebarFactory.getSideBarOptions();
        $scope.selectedOption = SidebarFactory.getSelectedOption();

        $scope.selectOption = function (option) {
            $scope.selectedOption = option;
            SidebarFactory.setOption(option);
        };

        $scope.getOptionClass = function (option) {
            return $scope.selectedOption.name == option.name ? activeClass : "";
        }
    });

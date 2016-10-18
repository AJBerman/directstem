/**
 * Created by shay on 10/14/16.
 */

angular.module("WebserviceApp.Controllers")
    .controller("InfoSummaryCtrl", function ($scope, ProjectFactory) {
        $scope.activeProject = ProjectFactory.getActiveProject();

        $scope.getActiveProject = function () {
            $scope.activeProject = ProjectFactory.getActiveProject();
            return $scope.activeProject;
        };

        $scope.saveGraph= function() {
            ProjectFactory.saveGraph();
        };

        $scope.resetGraph = function() {
            ProjectFactory.resetGraph();
        };

        $scope.loadGraph = function() {
            ProjectFactory.loadGraph();
        }
    });

/**
 * Created by shay on 10/12/16.
 */

angular.module("WebserviceApp.Directives")
/**
 * Display more detail about a selected project like its history, performances,
 * components, and others relevant information.
 */
    .directive("projectInfo", function () {
        return {
            restrict: "E",
            templateUrl: "features/project/info/project-info.html",
            controller: function ($scope, ProjectFactory) {

                $scope.activeProject = ProjectFactory.getActiveProject();

                $scope.getActiveProject = function () {
                    $scope.activeProject = ProjectFactory.getActiveProject();
                    return  $scope.activeProject;
                }
            }
        }
    });

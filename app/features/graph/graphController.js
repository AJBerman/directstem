/**
 * Created by shay on 10/13/16.
 */

angular.module("WebserviceApp.Controllers")
    .controller("GraphCtrl", function($scope, ProjectFactory) {

        $scope.getActiveProject = function() {
            return ProjectFactory.getActiveProject();
        }

    });


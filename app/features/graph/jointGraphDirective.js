/**
 * Created by shay on 10/14/16.
 */

angular.module("WebserviceApp.Directives")
    .directive("jointGraph", function () {
        return {
            restrict: "E",
            templateUrl: "features/graph/joint-graph.html"
        }
    });

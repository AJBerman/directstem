angular.module("app.Controllers")
.controller("CharCtrl", function($scope, ChartFactory) {

    $scope.chart = ChartFactory.getChart();

    $scope.getChart = function() {
       return ChartFactory.getChart();
    }
});
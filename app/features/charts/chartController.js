angular.module("app.Controllers")
    .controller("CharCtrl", function ($scope, $http, ChartFactory) {

        $scope.chart = ChartFactory.getChart();

        $scope.getChart = function () {
            return ChartFactory.getChart();
        };

        /* Count the frequency of letters in the user submitted text. Ignore all
         * other characters.  See CharFactory.js for the expected json object format
         * */
        $scope.webservice = function (userText) {
            var userData = {text: userText};
            var url      = "/api/letters";

            $http.post(url, userData).then(
                function success(response) {
                    ChartFactory.setChartDataArray(response.data.data)
                },
                function error(response) {
                    console.log(response.status, response.statusText);
                })
        };
    });
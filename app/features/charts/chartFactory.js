angular.module("app.Services")
    .factory("ChartFactory", function () {

        /* Default chart data */
        var chart = {
            data: [
                {letter: "A", count: 19},
                {letter: "E", count: 5},
                {letter: "I", count: 13},
                {letter: "O", count: 17},
                {letter: "U", count: 9},
                {letter: "L", count: 3},
                {letter: "B", count: 21},
                {letter: "R", count: 0},
                {letter: "N", count: 5}
            ]
        };


        return {
            getChart: function () {
                return chart;
            },

            setChartDataArray: function (array) {
                chart.data = array;
            },

            addChartData: function (data) {
                chart.data.push(data);
            },

            clearChartData: function () {
                chart.data = [];
            }
        }
    });
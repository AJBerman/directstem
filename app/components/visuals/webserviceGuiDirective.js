angular.module("WebserviceApp.Directives")
    .directive("webserviceGui", function () {
        function link(scope, element) {
            /** MAIN SVG **/
            var width = 1200, height = 600;
            var xLoc  = width / 2 - 25;
            var yLoc  = 100;

            var svg = d3.select(element[0]).append("svg")
                .attr("width", width)
                .attr("height", height);

            if (!scope.project.graph) {
                var nodes = [
                    {id: 0, x: xLoc, y: yLoc},
                    {id: 1, x: xLoc, y: yLoc + 200}
                ];

                var edges = [
                    {source: nodes[1], target: nodes[0]}
                ];

                var myGraph = new Graph(svg, nodes, edges);
                myGraph.updateGraph();

                console.log("LOAD DEFAULT DATA");
            } else {
                console.log("LOAD DATA");
            }
        }


        return {
            restrict: "E",
            scope   : {project: "="},
            link    : link
        }
    });
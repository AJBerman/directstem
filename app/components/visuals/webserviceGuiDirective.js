angular.module("WebserviceApp.Directives")
    .directive("webserviceGui", function (ProjectFactory) {
        function link(scope, element) {
            // Ensure we are working on a new canvas by removing all the children
            // elements
            d3.select(element[0]).selectAll("*").remove();

            /** MAIN SVG **/
            var width = 1200, height = 600;
            var xLoc  = width / 2 - 25;
            var yLoc  = 100;

            var svg = d3.select(element[0]).append("svg")
                .attr("width", width)
                .attr("height", height);

            var project = scope.data;
            var nodes   = undefined;
            var edges   = undefined;
            var graph   = undefined;

            if (project.graph.nodes && project.graph.edges) {
                console.log("loading previous graph");

                nodes = project.graph.nodes;
                edges = project.graph.edges;

                graph = new Graph(svg, nodes, edges);
                graph.updateGraph();

            } else {
                console.log("loading default graph");

                nodes = [
                    {id: 0, x: xLoc, y: yLoc},
                    {id: 1, x: xLoc, y: yLoc + 200}
                ];

                edges = [
                    {source: nodes[1], target: nodes[0]}
                ];


                graph               = new Graph(svg);
                project.graph.nodes = nodes;
                project.graph.edges = edges;

                graph.nodes = nodes;
                graph.edges = edges;
                graph.updateGraph();
            }

        }


        return {
            restrict: "E",
            scope   : {data: "="},
            link    : link
        }
    });
// a very simple project model
function Project(id, author, name, description) {
    this.id          = id;
    this.author      = author;
    this.name        = name;
    this.description = description;

    /* --------------- DEFAULT VALUES --------------- */

    this.graph = {};
    this.nodes = undefined;
    this.edges = undefined;

    // array of webservice "run performance" values
    this.dataReport = [];

    // overview scatter plot demo data
    this.scatterData = [];

    // Keep track of composition level (nodes of nodes)
    this.history = {stack: []};

    /* Default chart demo data*/
    this.chart = {
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
        ],
    }
}

/**
 * This factory produce a singleton project. In a full application, it would
 * probably be used to load up data from a database but for this prototype,
 * it will load up some sample data.
 *
 * The purpose of this factory is to create a singleton object that holds all
 * the project's data. It also holds the current active project data. This
 * singleton object allows other controllers to interact with the project data.
 * For example: adding and removing a project from our database or switching project
 */
angular.module("WebserviceApp.Services")
    .factory("ProjectFactory", function () {
        var counter = 1000;

        var projects = [
            new Project(counter++, "adam", "foobar", "my description #1"),
            new Project(counter++, "james", "hello_world", "my description #2"),
            new Project(counter++, "james", "python_is_cool", "my description #2"),
            new Project(counter++, "luis", "fizz buzz", "my description #3"),
            new Project(counter++, "luis", "A* search", "my description #3"),
            new Project(counter++, "luis", "Dijkstra Search", "my description #3"),
            new Project(counter++, "nelson", "depth first search", "my description #4"),
            new Project(counter++, "nelson", "breadth first search", "my description #4"),
            new Project(counter++, "shay", "IDE", "my description #5")
        ];

        var activeProject = {};

        function findNode(nodes, node) {
            var result = null;
            nodes.forEach(function (n) {
                if (n.id == node.id) {
                    result = n;
                    console.log("FOUND", result);
                }
            });
            return result;
        }

        function generateCompositionEdges(compositionNodes) {
            var result = [];
            for (var i = 0; i < compositionNodes.length; i++) {
                var currentNode = compositionNodes[i];

                for (var k = 0; k < currentNode.neighbors.length; k++) {
                    var currentNeighbor = currentNode.neighbors[k];
                    result.push({source: currentNode, target: currentNeighbor});
                }
            }

            return result;
        }

        return {
            addProject: function (project) {
                projects.push(project);
                activeProject = {};
            },

            removeProject: function (project) {
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].id === project.id) {
                        projects.splice(i, 1);
                        break;
                    }
                }
            },

            getProjects: function () {
                return projects;
            },

            generateID: function () {
                return counter++;
            },

            getActiveProject: function () {
                return activeProject;
            },

            setActiveProject: function (id) {
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].id == id) {
                        activeProject = projects[i];
                    }
                }
            },

            /* =============== GRAPHS OPERATIONS =============== */
            /* TODO: clean up graph operations code, very messy */

            // save whatever graph MAIN is displaying onto the current project
            saveGraph: function () {
                var history      = activeProject.history.stack;
                var currentState = history[0];
                var parentNode   = currentState.parentNode;

                console.log("parentNode:", parentNode);

                var savedState = activeProject.graph.currentState();
                console.log("nodesL", history[history.length - 1].nodes);
                if (parentNode) {
                    parentNode                  = findNode(history[history.length - 1].nodes, parentNode);
                    parentNode.compositionNodes = savedState.nodes;
                    parentNode.compositionEdges = generateCompositionEdges(parentNode.compositionNodes);

                    console.log("parent node:", parentNode);

                    console.log("ce:", parentNode.compositionEdges);

                    activeProject.nodes = history[history.length - 1].nodes;
                    activeProject.edges = history[history.length - 1].edges;

                    console.log(history[history.length - 1].nodes);
                } else {
                    activeProject.nodes = savedState.nodes;
                    activeProject.edges = savedState.edges;
                }


                // "push" state to history stack for the current view
            },

            // clear out the main graph, start over. is an empty graph now
            resetGraph: function () {
                var svg = d3.select(".svg-main");
                svg.selectAll("*").remove();

                var defaultState = Graph.prototype.defaultState();
                var nodes        = defaultState.nodes;
                var edges        = defaultState.edges;


                // "push" state to history stack for the current view
                activeProject.history.stack = [defaultState];
                activeProject.graph         = new Graph(svg, nodes, edges);
                activeProject.graph.updateGraph();
            },

            // load whatever graph the current project contains
            loadGraph: function () {
                var svg = d3.select(".svg-main");
                svg.selectAll("*").remove();

                if (activeProject.nodes) {
                    var nodes = [];
                    var edges = [];

                    activeProject.nodes.forEach(function (n) {
                        nodes.push(JSON.parse(JSON.stringify(n)));
                    });
                    nodes.forEach(function (node) {
                        node.neighbors.forEach(function (n) {
                            var special;
                            for (var i = 0; i < nodes.length; i++) {
                                if (nodes[i].id == n.id) {
                                    special = nodes[i];
                                    edges.push({source: node, target: special});
                                }
                            }
                        });
                    });

                    nodes.forEach(function (node) {
                        var cn = [];
                        for (var i = 0; i < node.compositionNodes.length; i++) {
                            cn.push(JSON.parse(JSON.stringify(node.compositionNodes[i])));
                        }
                        node.compositionNodes = cn;

                        var ce = generateCompositionEdges(cn);
                        node.compositionEdges = ce;
                    });

                    activeProject.graph = new Graph(svg, nodes, edges);
                    activeProject.graph.updateGraph();

                    // "push" state to history stack for the current view
                    activeProject.history.stack = [{
                        nodes: nodes,
                        edges: edges
                    }];

                    console.log("loading a previous graph");
                } else {
                    this.resetGraph();
                    console.log("no data, loading a default graph");
                }
            },

            /* Clear the graph object because it contains reference to SVG.
             * This allow other application to generate SVG*/
            clearGraph: function () {
                activeProject.graph = {};
            },

            undoStateFact: function () {
                var history = activeProject.history.stack;

                // stack need to have at least one state
                if (history.length <= 1) return;

                history.shift();

                var svg = d3.select(".svg-main");
                svg.selectAll("*").remove();

                activeProject.graph = new Graph(svg, history[0].nodes, history[0].edges);
                activeProject.graph.updateGraph();
            },


            compositionFF: function () {

                // ensure that the user selectd a node first
                if (!activeProject.graph.state.selectedNode) {
                    console.error("Composition View: need to select a node first");
                    return;
                }

                var history      = activeProject.history.stack;
                var selectedNode = activeProject.graph.state.selectedNode;

                selectedNode.compositionNodes = selectedNode.compositionNodes || [];

                var _nodes = selectedNode.compositionNodes.slice();

                var _edges = selectedNode.compositionEdges.slice();

                var currentState = activeProject.graph.currentState();
                history.shift();
                history.unshift(currentState);

                var newState = {
                    parentNode: selectedNode,
                    nodes     : _nodes,
                    edges     : _edges
                };
                activeProject.history.stack.unshift(newState);

                var svg = d3.select(".svg-main");
                svg.selectAll("*").remove();

                activeProject.graph = new Graph(svg, history[0].nodes, history[0].edges);
                activeProject.graph.updateGraph();
            },


            /* ====== PERFORMANCES, RECORD, HISTORY DATA OPERATIONS  ======*/

            /**
             * TODO: use real data instead of generating fake data;
             * generate fake performance data from 1-100 and push it into the
             * the activeProject dataReport array
             */
            generateRandomData: function () {
                var min        = 1, max = 100;
                var randomData = Math.floor(Math.random() * (max - min + 1)) + min;
                activeProject.dataReport.push(randomData);
            },

            generateScatterPlotDataFactory: function () {
                activeProject.scatterData.push({
                    x: Math.random() * 10,
                    y: Math.random() * 10,
                    r: 15,
                    h: false
                });
            },

            setChartDataArrayFactory: function (array) {
                activeProject.chart.data = array;
            },
        }
    });
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
                var savedState      = activeProject.graph.saveState();
                activeProject.nodes = savedState.nodes;
                activeProject.edges = savedState.edges;

            },

            // clear out the main graph, start over. is an empty graph now
            resetGraph: function () {
                var svg = d3.select(".svg-main");
                svg.selectAll("*").remove();

                var defaultState = Graph.prototype.defaultState();
                var nodes        = defaultState.nodes;
                var edges        = defaultState.edges;

                activeProject.graph = new Graph(svg, nodes, edges);
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
                        nodes.push({id: n.id, x: n.x, y: n.y});
                    });
                    activeProject.edges.forEach(function (e) {
                        edges.push({source: e.source, target: e.target});
                    });

                    activeProject.graph = new Graph(svg, nodes, edges);
                    activeProject.graph.updateGraph();

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
            }
        }
    });
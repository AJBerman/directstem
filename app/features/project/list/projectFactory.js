/**
 * Created by shay on 10/12/16.
 */

// a very simple project model
function Project(id, author, name, description) {
    this.id          = id;
    this.author      = author;
    this.name        = name;
    this.description = description;

    /* --------------- DEFAULT VALUES --------------- */

    this.graph = {
        nodes: undefined,
        edges: undefined
    };

    // array of webservice "run performance" values
    this.dataReport = [];
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

            // save whatever graph MAIN is displaying onto the current project
            saveGraph: function () {

                console.log("Graph saved");
            },

            // clear out the main graph, start over. is an empty graph now
            resetGraph: function () {

                console.log("Graph reset");
            },

            // load whatever graph the current project contains
            loadGraph: function () {

                console.log("Graph loaded.");
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
            }
        }
    });
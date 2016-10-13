/**
 * Created by shay on 10/12/16.
 */

// a very simple project model
function Project(id, author, name, description) {
    this.id = id;
    this.author = author;
    this.name = name;
    this.description = description;
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
angular.module("WebserviceApp.Providers")
    .factory("ProjectFactory", function () {
        var counter = 1000;

        var projects = [
            new Project(counter++, "adam", "foobar", "my description #1"),
            new Project(counter++, "james", "hello_world", "my description #2"),
            new Project(counter++, "luis", "fizz buzz", "my description #3"),
            new Project(counter++, "nelson", "depth first search", "my description #4"),
            new Project(counter++, "shay", "IDE", "my description #5")
        ];

        var activeProject = {};

        return {
            addProject: function (project) {
                projects.push(project);
                activeProject = null;
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
            }
        }
    });
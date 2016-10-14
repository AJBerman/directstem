/**
 * Created by shay on 10/11/16.
 */

// the root module
angular.module("WebserviceApp", [
        "ngRoute",
        "WebserviceApp.Directives",
        "WebserviceApp.Controllers",
        "WebserviceApp.Providers",
        "WebserviceApp.Filters",
    ]
);


// set up routing
angular.module("WebserviceApp")
    .config(function ($routeProvider) {


        $routeProvider.when("/project", {
            templateUrl: "/views/project.html"
        });

        $routeProvider.when("/about", {
            templateUrl: "/views/about.html"
        });

        $routeProvider.when("/contact", {
            templateUrl: "/views/contact.html"
        });

        $routeProvider.when("/graph", {
            templateUrl: "/features/graph/example_1.html"
        });

        $routeProvider.otherwise({
            templateUrl: "/views/project.html"
        });
    });

// controllers
angular.module("WebserviceApp.Controllers", []);

// directives
angular.module("WebserviceApp.Directives", []);

// providers
angular.module("WebserviceApp.Providers", []);

// filters
angular.module("WebserviceApp.Filters", []);

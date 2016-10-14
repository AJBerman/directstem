/**
 * Created by shay on 10/13/16.
 */

angular.module("WebserviceApp.Providers")
    .factory("SidebarFactory", function () {

        var sidebarOptions = [
            {name: "Overview", url: ""},
            {name: "Reports", url: ""},
            {name: "Analytic", url: ""},
            {name: "History", url: ""},
            {name: "Create Webservice", url: "#graph"},
            // TODO: implement feature to load an existing project
            {name: "Load Webservice", url: "#graph"}
        ];

        var selectedOption = sidebarOptions[0];

        return {

            setOption: function (option) {
                selectedOption = option;
            },

            getSelectedOption: function () {
                return selectedOption;
            },

            getSideBarOptions: function () {
                return sidebarOptions;
            }
        }
    });

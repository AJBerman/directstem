/**
 * Created by shay on 10/14/16.
 */

angular.module("WebserviceApp.Controllers")

    .constant("SPIN_ICON", "fa-spin")

    .constant("DEFAULT_BTN_CSS", "btn-default")

    .constant("CANCEL_BTN_CSS", "btn-danger")

    .controller("InfoSummaryCtrl", function($scope, ProjectFactory, SPIN_ICON,
                                            DEFAULT_BTN_CSS, CANCEL_BTN_CSS) {

        var runBtnToggle = false;

        // default text, can be toggle to 'Stop Project"
        var runBtnText = "Run Project";

        $scope.activeProject = ProjectFactory.getActiveProject();

        /* =============== PROJECT FUNCTIONS =============== */

        $scope.getActiveProject = function() {
            $scope.activeProject = ProjectFactory.getActiveProject();
            return $scope.activeProject;
        };

        /* =============== GRAPH FUNCTIONS =============== */

        $scope.saveGraph = function() {
            ProjectFactory.saveGraph();
        };

        $scope.resetGraph = function() {
            ProjectFactory.resetGraph();
        };

        $scope.loadGraph = function() {
            ProjectFactory.loadGraph();
        };

        /* =============== BUTTONS FUNCTIONS =============== */

        $scope.toggleRunBtn = function() {
            runBtnToggle = !runBtnToggle;
            runBtnToggle ? runBtnText = "Stop Project" : runBtnText = "Run Project";

            // push random data to activeProject report whenever a project's
            // webservice is run
            if(runBtnToggle) ProjectFactory.generateRandomData();

        };

        $scope.getIconClass = function() {
            return runBtnToggle ? SPIN_ICON : ""
        };

        // display the "run" attribute text as the default text (when
        // the page is first loaded, else return the text field .
        $scope.displayBtnText = function() {
            return runBtnText;
        };

        $scope.getBtnClass = function() {
            return runBtnToggle ? CANCEL_BTN_CSS : DEFAULT_BTN_CSS;
        }
    });


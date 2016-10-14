/**
 * Created by shay on 10/14/16.
 */

angular.module("WebserviceApp.Directives")

    .constant("SPIN_ICON", "fa-spin")

    .constant("SUBMIT_BTN_CSS", "btn-primary")

    .constant("CANCEL_BTN_CSS", "btn-danger")
    /**
     * This directive creates a button with a spin-able cog icon.
     * The user need to enter text for the "run" and "stop" attribute.
     * These are the text that display when the button is "running" and when
     * it is toggle to stop.
     */
    .directive("runButton", function () {
        return {
            restrict: "E",
            templateUrl: "components/buttons/run/run-button.html",
            scope: {run: "@", stop: "@"},
            controller: function ($scope, SPIN_ICON, SUBMIT_BTN_CSS, CANCEL_BTN_CSS) {
                var toggle = false;
                var text = null;

                $scope.toggleRunBtn = function (run, stop) {
                    toggle = !toggle;
                    toggle ? text = stop : text = run;
                };

                $scope.getIconClass = function () {
                    return toggle ? SPIN_ICON : ""
                };

                // display the "run" attribute text as the default text (when
                // the page is first loaded, else return the text field .
                $scope.displayBtnText = function (run) {
                    if (text == null)
                        return run;
                    else
                        return text;
                };

                $scope.getBtnClass= function() {
                    return toggle ? CANCEL_BTN_CSS : SUBMIT_BTN_CSS
                }
            }
        }
    });

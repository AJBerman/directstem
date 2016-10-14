/** * Created by shay on 10/12/16. */

angular.module("WebserviceApp.Controllers")

    .constant("ACTIVE_BTN_CSS", "btn-primary")

    .constant("PROJECT_PER_PAGE", 3)

    .constant("ACTIVE_PANEL_CSS", "panel-success")

    .controller("ProjectListCtrl",
        function ($scope, $filter, ProjectFactory, ACTIVE_BTN_CSS, PROJECT_PER_PAGE,
                  ACTIVE_PANEL_CSS) {

            var selectedAuthor = null;

            $scope.projectToBeEdited = {};
            $scope.projects = ProjectFactory.getProjects();
            $scope.selectedPage = 1;
            $scope.pageSize = PROJECT_PER_PAGE;


            /* =============== Author buttons functions =============== */
            $scope.selectAuthor = function (author) {
                selectedAuthor = author;
                $scope.selectedPage = 1;
            };

            $scope.getAuthorClass = function (author) {
                return selectedAuthor == author ? ACTIVE_BTN_CSS : "";
            };

            $scope.authorFilter = function (project) {
                return selectedAuthor == null ||
                    project.author == selectedAuthor;
            };

            $scope.getAuthorCount = function(author) {
                var count = 0;
                angular.forEach($scope.projects, function(project) {
                    if(project.author == author)
                        count++;
                });

                return count;
            };
            /* =============== Project Panel functions =============== */
            $scope.getPanelClass = function (project) {
                return ProjectFactory.getActiveProject().id == project.id
                    ? ACTIVE_PANEL_CSS : ""
            };

            $scope.selectPanel = function (project) {
                ProjectFactory.setActiveProject(project.id);
            };

            $scope.editProject = function (project) {
                $scope.projectToBeEdited = project;
            };

            $scope.deleteProject = function (project) {
                ProjectFactory.removeProject(project);
                $scope.projects = ProjectFactory.getProjects();
            };


            /* =============== Pagination functions =============== */
            $scope.selectPage = function (page) {
                $scope.selectedPage = page;
            };

            $scope.getPageClass = function (page) {
                return $scope.selectedPage == page ? ACTIVE_BTN_CSS : ""
            };


        });


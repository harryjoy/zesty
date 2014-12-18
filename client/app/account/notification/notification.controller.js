'use strict';

angular.module('zesty')
  .controller('NotificationCtrl', ['$scope', 'User', 'PaginationServ',
    function ($scope, User, PaginationServ) {

  $scope.notifications = [];
  $scope.totalItems = 0;
  $scope.init = function () {
    User.notifications({
      id: $scope.user._id,
      pageSize: 10
    }).$promise.then(function (result) {
      PaginationServ.refreshData();
      if (result && result.data && result.data.length > 0) {
        $scope.notifications = result.data;
        $scope.totalItems = result.count;
        PaginationServ.setPageData(1, result.data);
      } else {
        $scope.notifications = [];
        $scope.totalItems = 0;
      }
    }).catch(function (err) {
      $scope.errors = err;
    });
  };

  $scope.init(); // init the list for the first time.

  /**
   * Called when page is changed.
   */
  $scope.pageChanged = function() {
    var notifications = PaginationServ.getPageData($scope.currentPage);
    if (!notifications || notifications === null) {
      User.notifications({
        id: $scope.getCurrentUser()._id,
        pageNumber: $scope.currentPage - 1,
        pageSize: 10
      }).$promise.then(function (result) {
        $scope.notifications = result.data;
        $scope.totalItems = result.count;
        PaginationServ.setPageData($scope.currentPage, result.data);
      }).catch(function (err) {
        $scope.errors = err;
      });
    } else {
      $scope.notifications = notifications;
    }
    $scope.scrollToTop();
  };

}]);

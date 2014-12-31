'use strict';

angular.module('zesty')
  .controller('OrderCtrl', ['$scope', 'User', 'AlertServ', 'PaginationServ', 'ProductUtil',
      function ($scope, User, AlertServ, PaginationServ, ProductUtil) {
  
  $scope.orders = [];
  $scope.totalItems = 0;
  $scope.calculatePrice = ProductUtil.calculatePrice;
  $scope.calculateCartPrice = ProductUtil.calculateCartPrice;
  $scope.init = function () {
    User.orders({
      id: $scope.getCurrentUser()._id,
      pageSize: 10
    }).$promise.then(function (result) {
      PaginationServ.refreshData();
      if (result && result.data && result.data.length > 0) {
        $scope.orders = result.data;
        $scope.totalItems = result.count;
        PaginationServ.setPageData(1, result.data);
      } else {
        $scope.orders = [];
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
    var orders = PaginationServ.getPageData($scope.currentPage);
    if (!orders || orders === null) {
      User.orders({
        id: $scope.getCurrentUser()._id,
        pageNumber: $scope.currentPage - 1,
        pageSize: 10
      }).$promise.then(function (result) {
        $scope.orders = result.data;
        $scope.totalItems = result.count;
        PaginationServ.setPageData($scope.currentPage, result.data);
      }).catch(function (err) {
        $scope.errors = err;
      });
    } else {
      $scope.orders = orders;
    }
    $scope.scrollToTop();
  };

}]);

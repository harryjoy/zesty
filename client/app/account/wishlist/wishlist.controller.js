'use strict';

angular.module('zesty')
  .controller('WishlistCtrl', ['$scope', 'Modal', 'User', 'ProductServ', 'AlertServ', 'PaginationServ',
    function ($scope, Modal, User, ProductServ, AlertServ, PaginationServ) {

  $scope.totalItems = 0;
  $scope.noData = false;
  $scope.init = function () {
    User.favorites({
      id: $scope.getCurrentUser()._id,
      pageSize: 5
    }).$promise.then(function (result) {
      PaginationServ.refreshData();
      if (result && result.data && result.data.length > 0) {
        $scope.items = result.data;
        $scope.totalItems = result.count;
        PaginationServ.setPageData(1, result.data);
      } else {
        $scope.items = [];
        $scope.totalItems = 0;
        $scope.noData = true;
      }
    }).catch(function (err) {
      $scope.errors = err;
      $scope.noData = true;
    });
  };

  $scope.init(); // init the list for the first time.

  $scope.pageChanged = function() {
    var items = PaginationServ.getPageData($scope.currentPage);
    if (!items || items === null) {
      User.favorites({
        id: $scope.getCurrentUser()._id,
        pageNumber: $scope.currentPage - 1,
        pageSize: 5
      }).$promise.then(function (result) {
        $scope.items = result.data;
        $scope.totalItems = result.count;
        PaginationServ.setPageData($scope.currentPage, result.data);
      }).catch(function (err) {
        $scope.errors = err;
      });
    } else {
      $scope.items = items;
    }
  };

  // Modal.confirm.delete returns a function that will open a modal when ran
  // We use closure to define the callback for the modal's confirm action here in the controller
  // $scope.delete = Modal.confirm.delete(function(productId) { // callback when modal is confirmed
  //   ProductServ.removeFavorite({
  //     id: productId
  //   }, function() {
  //     $scope.init(); // init the list when a record is delete to update pagination.
  //   }, function(err) {
  //     console.log(err);
  //     AlertServ.alert('Error while removing wishlist, please try again later.');
  //   });
  // });

  $scope.delete = function(productId) {
    ProductServ.removeFavorite({
      id: productId
    }, function() {
      $scope.init(); // init the list when a record is delete to update pagination.
    }, function(err) {
      console.log(err);
      AlertServ.alert('Error while removing wishlist, please try again later.');
    });
  };
}]);


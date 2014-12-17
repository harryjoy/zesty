'use strict';

angular.module('zesty')
  .controller('WishlistCtrl', ['$scope', 'Modal', 'User', 'ProductServ', 'AlertServ',
    'PaginationServ', 'Auth', 'ProductUtil',
    function ($scope, Modal, User, ProductServ, AlertServ, PaginationServ, Auth, ProductUtil) {

  $scope.totalItems = 0;
  $scope.noData = false;
  $scope.items = [];
  $scope.addToCart = Auth.addItemToCart;

  /**
   * Intialize wish list.
   * @return {[Product]} Wish list of user.
   */
  $scope.init = function () {
    $scope.items = [];
    User.favorites({
      id: $scope.getCurrentUser()._id,
      pageSize: 9
    }).$promise.then(function (result) {
      PaginationServ.refreshData();
      if (result && result.data && result.data.length > 0) {
        _.forEach(result.data, function(product){
          $scope.items.push(ProductUtil.convertItem(product));
        });
        $scope.totalItems = result.count;
        PaginationServ.setPageData(1, $scope.items);
        $scope.checkItemsInCart();
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

  /**
   * Check whether the item in the wishlist is in the cart or not.
   * @return {[type]} [description]
   */
  $scope.checkItemsInCart = function() {
    if ($scope.cart.products &&
      $scope.items && $scope.items.length > 0) {
      _.forEach($scope.items, function(item) {
        var addedToCart = false;
        _.forEach($scope.cart.products, function(currentProduct) {
          if (currentProduct._id === item._id) {
            addedToCart = true;
            return false;
          }
        });
        item.addedToCart = addedToCart;
      });
    }
  };

  $scope.init(); // init the list for the first time.
  $scope.$on('cart.updated', $scope.checkItemsInCart);

  /**
   * Called on page change event.
   */
  $scope.pageChanged = function() {
    var items = PaginationServ.getPageData($scope.currentPage);
    if (!items || items === null) {
      User.favorites({
        id: $scope.getCurrentUser()._id,
        pageNumber: $scope.currentPage - 1,
        pageSize: 9
      }).$promise.then(function (result) {
        if (result && result.data && result.data.length > 0) {
          $scope.items = [];
          _.forEach(result.data, function(product){
            $scope.items.push(ProductUtil.convertItem(product));
          });
          $scope.totalItems = result.count;
          PaginationServ.setPageData($scope.currentPage, $scope.items);
        } else {
          $scope.noData = true;
        }
      }).catch(function (err) {
        $scope.errors = err;
      });
    } else {
      $scope.items = items;
    }
    $scope.scrollToTop();
  };

  /**
   * Remove item from wishlist.
   * @param  {String} productId id of item to remove
   */
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


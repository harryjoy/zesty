'use strict';

angular.module('zesty')
  .controller('CartCtrl', ['$scope', 'Auth', '$location', 'CartServ', 'ProductUtil',
  function ($scope, Auth, $location, CartServ, ProductUtil) {
 
  $scope.deleteItem = Auth.removeItemFromCart;
  $scope.updateCart = Auth.updateCart;
  $scope.calculatePrice = ProductUtil.calculatePrice;
  $scope.calculateCartPrice = ProductUtil.calculateCartPrice;
  $scope.errorMessage = 'Error while processing cart, please try again later.';
  $scope.cartProcessError = false;

  $scope.proceedToCheckout = function() {
    $scope.cartProcessError = false;
    var limits = $scope.user.cartLimits;
    if (limits.price <= 0 && limits.items <= 0 &&
      limits.priceMonthly <= 0 && limits.itemsMonthly <= 0 &&
      limits.priceYearly <= 0 && limits.itemsYearly <= 0) {
      $location.path('/auth');
    } else {
      CartServ.resource().checkLimits({
        id: $scope.cart._id
      }, function(cart) {
        $scope.cart = cart;
        Auth.setCart(cart);
        $location.path('/auth');
      }, function(err) {
        $scope.cartProcessError = true;
        if (err && err.data && err.data.isError) {
          $scope.errorMessage = err.data.message;
        }
      });
    }
  };
}]);

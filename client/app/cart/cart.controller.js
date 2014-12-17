'use strict';

angular.module('zesty')
  .controller('CartCtrl', ['$scope', 'Auth', '$location', 'CartServ',
  function ($scope, Auth, $location, CartServ) {
 
  $scope.deleteItem = Auth.removeItemFromCart;
  $scope.updateCart = Auth.updateCart;
  $scope.errorMessage = 'Error while processing cart, please try again later.';
  $scope.cartProcessError = false;

  $scope.proceedToCheckout = function() {
    $scope.cartProcessError = false;
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
  };
}]);

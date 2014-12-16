'use strict';

angular.module('zesty')
  .controller('CheckoutCtrl', ['$scope', 'Auth', 'OrderUtil', 'OrderServ',
    function ($scope, Auth, OrderUtil, OrderServ) {
 
  Auth.isLoggedInAsync(function(loggedIn) {
    $scope.loggedInNow = loggedIn;
  });

  $scope.order = OrderUtil.getOrderFromCart($scope.cart, $scope.orderPrefix);
  $scope.$on('cart.updated', function() {
    $scope.order = OrderUtil.updateOrderFromCart($scope.cart, $scope.orderPrefix, $scope.order);
  });
  $scope.$on('order.updated', function(event, order) {
    $scope.order = order;
  });

  OrderServ.getOrder({
    customerId: $scope.user._id
  }).$promise.then(function(order) {
    if (order) {
      $scope.order = _.extend(order, $scope.order);
      $scope.$broadcast('got.order.from.db');
    }
  });
}]);

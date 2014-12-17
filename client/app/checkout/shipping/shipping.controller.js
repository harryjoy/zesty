'use strict';

angular.module('zesty')
  .controller('ShippingCtrl', ['$scope', '$location', 'OrderServ', '$rootScope', 'Auth', 'CartServ', 'AlertServ',
    function ($scope, $location, OrderServ, $rootScope, Auth, CartServ, AlertServ) {

  $scope.addresses = $scope.user.addresses;
  if ($scope.user.addresses && $scope.user.addresses.length > 0) {
    _.forEach($scope.user.addresses, function(address) {
      address.isSelected = address.isDefault;
    });
  }
  $scope.showNewAddressForm = false;

  $scope.$on('got.order.from.db', function() {
    if ($scope.addresses && $scope.addresses.length > 0) {
      _.forEach($scope.addresses, function(address) {
        address.isSelected = (address._id === $scope.order.address._id);
      });
    }
  });

  $scope.goToPayment = function() {
    if ($scope.showNewAddressForm) {
      $scope.order.address = $scope.address;
    } else {
      _.forEach($scope.user.addresses, function(address) {
        if (address.isSelected) {
          $scope.order.address = address;
          return false;
        }
      });
    }
    if ($scope.cart.promoCode) {
      CartServ.resource().checkPromoCode({
        id: $scope.cart._id
      }, function(cart) {
        Auth.setCart(cart);
        $scope.cart = cart;
        $scope.updateOrder();
      }, function(err) {
        console.log(err);
        AlertServ.alert('Error while placing order, please try again.');
      });
    } else {
      $scope.updateOrder();
    }
  };

  $scope.updateOrder = function() {
    if ($scope.order._id) {
      OrderServ.update({
        id: $scope.order._id
      }, $scope.order, function(order) {
        $rootScope.$broadcast('order.updated', order);
        $location.path('/checkout/payment');
      });
    } else {
      OrderServ.save($scope.order, function(order) {
        $rootScope.$broadcast('order.updated', order);
        $location.path('/checkout/payment');
      });
    }
  };

  $scope.selecteThis = function (addressId) {
    _.forEach($scope.user.addresses, function(address) {
      address.isSelected = (address._id === addressId);
    });
  };
}]);

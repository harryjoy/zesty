'use strict';

angular.module('zesty')
  .controller('PaymentCtrl', ['$scope', '$location', 'OrderServ', 'Auth',
    function ($scope, $location, OrderServ, Auth) {
  $scope.paymentMethods = [{
    name: 'Credit Card',
    icon: 'fa-credit-card',
    url: '',
    method: 'CC'
  }, {
    name: 'Debit Card',
    icon: 'fa-credit-card',
    url: '/debitcard',
    method: 'DC'
  }, {
    name: 'Net Banking',
    icon: 'fa-keyboard-o',
    url: '/netbanking',
    method: 'NB'
  }, {
    name: 'COD',
    icon: 'fa-money',
    url: '/cod',
    method: 'COD'
  }/*, {
    name: 'Paypal',
    icon: 'fa-paypal',
    url: '/paypal',
    method: 'PP'
  }, {
    name: 'Google Wallet',
    icon: 'fa-google-wallet',
    url: '/googlewallet',
    method: 'GW'
  }*/];

  $scope.proceed = function() {
    var path = $location.path().replace('/checkout/payment', '');
    var selectedMethod = '';
    _.forEach($scope.paymentMethods, function(method) {
      if (method.url === path) {
        selectedMethod = method.method;
        return false;
      }
    });
    if (selectedMethod && selectedMethod !== '') {
      $scope.order.paymentMethod = selectedMethod;
      OrderServ.payment({
        id: $scope.order._id
      }).$promise.then(function(order) {
        $scope.order = order;
        Auth.refreshCart();
        $location.path('/my/orders');
      });
    }
  };
}]);

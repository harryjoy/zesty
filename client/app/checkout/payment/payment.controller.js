'use strict';

angular.module('zesty')
  .controller('PaymentCtrl', ['$scope',
    function ($scope) {
  $scope.paymentMethods = [{
    name: 'Credit Card',
    icon: 'fa-credit-card',
    url: ''
  }, {
    name: 'Debit Card',
    icon: 'fa-credit-card',
    url: '/debitcard'
  }, {
    name: 'Net Banking',
    icon: 'fa-keyboard-o',
    url: '/netbanking'
  }, {
    name: 'COD',
    icon: 'fa-money',
    url: '/cod'
  }/*, {
    name: 'Paypal',
    icon: 'fa-paypal',
    url: '/paypal'
  }, {
    name: 'Google Wallet',
    icon: 'fa-google-wallet',
    url: '/googlewallet'
  }*/];
}]);

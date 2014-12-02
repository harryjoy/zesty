'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout.payment.creditcard', {
        url: '',
        templateUrl: 'app/checkout/payment/creditcard/creditcard.html',
        controller: 'CreditcardCtrl'
      })
      .state('checkout.payment.debitcard', {
        url: '/debitcard',
        templateUrl: 'app/checkout/payment/debitcard/debitcard.html',
        controller: 'DebitcardCtrl'
      })
      .state('checkout.payment.cod', {
        url: '/cod',
        templateUrl: 'app/checkout/payment/cod/cod.html',
        controller: 'CodCtrl'
      })
      .state('checkout.payment.paypal', {
        url: '/paypal',
        templateUrl: 'app/checkout/payment/paypal/paypal.html',
        controller: 'PaypalCtrl'
      })
      .state('checkout.payment.googlewallet', {
        url: '/googlewallet',
        templateUrl: 'app/checkout/payment/googlewallet/googlewallet.html',
        controller: 'GoogleWalletCtrl'
      })
      .state('checkout.payment.netbanking', {
        url: '/netbanking',
        templateUrl: 'app/checkout/payment/netbanking/netbanking.html',
        controller: 'NetBankingCtrl'
      });
  });
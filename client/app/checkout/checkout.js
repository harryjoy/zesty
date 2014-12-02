'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        abstract: true
      })
      .state('checkout.shipping', {
        url: '',
        templateUrl: 'app/checkout/shipping/shipping.html',
        controller: 'ShippingCtrl'
      })
      .state('checkout.billing', {
        url: '/billing',
        templateUrl: 'app/checkout/billing/billing.html',
        controller: 'BillingCtrl'
      })
      .state('checkout.payment', {
        url: '/payment',
        templateUrl: 'app/checkout/payment/payment.html',
        controller: 'PaymentCtrl',
        abstract: true
      });
  });
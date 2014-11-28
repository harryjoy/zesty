'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/account/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/account/signup/signup.html',
      controller: 'SignupCtrl'
    })
    .state('profile', {
      url: '/my',
      templateUrl: 'app/account/account.html',
      controller: 'AccountCtrl',
      authenticate: true,
      abstract: true,
    })
    .state('profile.my', {
      url: '',
      templateUrl: 'app/account/profile/profile.html',
      controller: 'ProfileCtrl',
      authenticate: true
    })
    .state('profile.order', {
      url: '/orders',
      templateUrl: 'app/account/order/order.html',
      controller: 'OrderCtrl',
      authenticate: true
    })
    .state('profile.invoice', {
      url: '/invoice/:id',
      templateUrl: 'app/account/invoice/invoice.html',
      controller: 'InvoiceCtrl',
      authenticate: true
    })
    .state('profile.wishlist', {
      url: '/wishlist',
      templateUrl: 'app/account/wishlist/wishlist.html',
      controller: 'WishlistCtrl',
      authenticate: true
    })
    .state('profile.settings', {
      url: '/settings',
      templateUrl: 'app/account/settings/settings.html',
      controller: 'SettingsCtrl',
      authenticate: true
    });
});
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
    })
    .state('profile.review', {
      url: '/reviews',
      templateUrl: 'app/account/review/review.html',
      controller: 'ReviewCtrl',
      authenticate: true
    })
    .state('profile.savedcard', {
      url: '/savedcard',
      templateUrl: 'app/account/savedcard/savedcard.html',
      controller: 'SavedCardCtrl',
      authenticate: true
    })
    .state('profile.wallet', {
      url: '/wallet',
      templateUrl: 'app/account/wallet/wallet.html',
      controller: 'WalletCtrl',
      authenticate: true
    })
    .state('profile.subscription', {
      url: '/subscription',
      templateUrl: 'app/account/subscription/subscription.html',
      controller: 'SubscriptionCtrl',
      authenticate: true
    })
    .state('profile.recommended', {
      url: '/recommended',
      templateUrl: 'app/account/recommended/recommended.html',
      controller: 'RecommendedCtrl',
      authenticate: true
    })
    .state('profile.deactivation', {
      url: '/deactivation',
      templateUrl: 'app/account/deactivation/deactivation.html',
      controller: 'DeactivationCtrl',
      authenticate: true
    });
});
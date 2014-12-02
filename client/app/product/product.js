'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product/:id',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      });
  });
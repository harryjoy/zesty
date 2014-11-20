'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product/:id',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      });
  });
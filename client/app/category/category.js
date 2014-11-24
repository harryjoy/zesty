'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/category/:id',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
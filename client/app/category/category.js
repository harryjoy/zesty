'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/category/:id',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl'
      });
  });
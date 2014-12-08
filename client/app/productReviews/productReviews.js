'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('productReviews', {
        url: '/product-reviews/:id/:reviewstyle',
        templateUrl: 'app/productReviews/productReviews.html',
        controller: 'ProductreviewsCtrl'
      });
  });
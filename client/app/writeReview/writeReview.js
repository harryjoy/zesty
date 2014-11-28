'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('writeReview', {
        url: '/write-review',
        templateUrl: 'app/writeReview/writeReview.html',
        controller: 'WritereviewCtrl'
      });
  });
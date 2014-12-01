'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('writeReview', {
        url: '/write-review/:id',
        templateUrl: 'app/writeReview/writeReview.html',
        controller: 'WritereviewCtrl'
      });
  });
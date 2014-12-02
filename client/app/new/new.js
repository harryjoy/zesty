'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new', {
        url: '/new',
        templateUrl: 'app/new/new.html',
        controller: 'NewCtrl'
      });
  });
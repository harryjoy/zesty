'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('new', {
        url: '/new',
        templateUrl: 'app/new/new.html',
        controller: 'NewCtrl'
      });
  });
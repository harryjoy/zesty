'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('authentication', {
        url: '/auth',
        templateUrl: 'app/authentication/authentication.html',
        controller: 'AuthenticationCtrl'
      });
  });
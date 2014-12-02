'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('authentication', {
        url: '/auth',
        templateUrl: 'app/authentication/authentication.html',
        controller: 'AuthenticationCtrl'
      });
  });
'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('deals', {
        url: '/deals',
        templateUrl: 'app/deals/deals.html',
        controller: 'DealsCtrl'
      });
  });
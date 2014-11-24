'use strict';

angular.module('fullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('deals', {
        url: '/deals',
        templateUrl: 'app/deals/deals.html',
        controller: 'DealsCtrl'
      });
  });
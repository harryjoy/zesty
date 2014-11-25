'use strict';

angular.module('fullApp')
  .directive('orderSummary', function () {
    return {
      templateUrl: 'app/directives/orderSummary/orderSummary.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
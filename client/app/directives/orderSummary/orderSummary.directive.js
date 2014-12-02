'use strict';

angular.module('zesty')
  .directive('orderSummary', function () {
    return {
      templateUrl: 'app/directives/orderSummary/orderSummary.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
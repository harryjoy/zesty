'use strict';

angular.module('fullApp')
  .directive('clearfix', function () {
    return {
      templateUrl: 'app/directives/clearfix/clearfix.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
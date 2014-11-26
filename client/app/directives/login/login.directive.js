'use strict';

angular.module('fullApp')
  .directive('login', function () {
    return {
      templateUrl: 'app/directives/login/login.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
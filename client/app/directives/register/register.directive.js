'use strict';

angular.module('fullApp')
  .directive('register', function () {
    return {
      templateUrl: 'app/directives/register/register.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
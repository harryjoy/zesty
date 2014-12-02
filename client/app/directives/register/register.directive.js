'use strict';

angular.module('zesty')
  .directive('register', function () {
    return {
      templateUrl: 'app/directives/register/register.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
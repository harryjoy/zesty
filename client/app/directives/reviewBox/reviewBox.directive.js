'use strict';

angular.module('zesty')
  .directive('reviewBox', function () {
    return {
      templateUrl: 'app/directives/reviewBox/reviewBox.html',
      restrict: 'E',
      scope: true,
      link: function (scope, element, attrs) {
      	scope.noFooter = attrs.noFooter;
      }
    };
  });
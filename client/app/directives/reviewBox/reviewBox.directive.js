'use strict';

angular.module('zesty')
  .directive('reviewBox', function () {
    return {
      templateUrl: 'app/directives/reviewBox/reviewBox.html',
      restrict: 'E',
      scope: {
        review: '='
      },
      link: function (scope, element, attrs) {
        scope.noFooter = attrs.noFooter;
        scope.isMine = false;
        if (attrs.isLoggedIn && scope.review.customerId &&
              scope.review.customerId === attrs.customerId) {
          scope.isMine = true;
        }
        scope.moment = window.moment;
      }
    };
  });
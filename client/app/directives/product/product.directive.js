'use strict';

angular.module('zesty')
  .directive('product', function () {
    return {
      templateUrl: 'app/directives/product/product.html',
      restrict: 'E',
      scope: true,
      link: function (scope, element) {
        var small = $(element).attr('small');
        if (small) {
          scope.sizeClass = 'col-sm-4 col-md-3';
        } else {
          scope.sizeClass = 'col-sm-6 col-md-4';
        }
      }
    };
  });
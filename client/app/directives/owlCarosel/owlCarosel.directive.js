'use strict';

angular.module('zesty')
  .directive('owlCarosel', function () {
    return {
      templateUrl: 'app/directives/owlCarosel/owlCarosel.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.init = function () {
          scope.destroyCarousel();
          var options = scope.$eval($(element).attr('data-options'));
          scope.sliderInstance = $('#owl-example').owlCarousel(options);
        };
        scope.destroyCarousel = function () {
          if (scope.sliderInstance && scope.sliderInstance.data('owlCarousel')) {
            scope.sliderInstance.data('owlCarousel').destroy();
            scope.sliderInstance = null;
          }
        };
        // scope.$watch(attrs.watch, function (newVal) {
        //   if (newVal && newVal.length > 0) {
        //     scope.init();
        //   } else {
        //     scope.destroyCarousel();
        //   }
        // });
        scope.init();
      }
    };
  });
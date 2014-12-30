'use strict';

angular.module('zesty')
  .directive('owlCarosel', function () {
    return {
      scope: true,
      link: function (scope, element, attrs) {
        var defaults = {
          // Important
          items : 6,

          itemsDesktop : [1419,4],
          itemsDesktopSmall : [992,2],
          itemsTablet : [767,1],
          singleItem : false,
          itemsScaleUp : false,

          // will also animate pagination
          autoHeight: false,

          // Navigation
          navigation: false,
          rewindNav : false,
          scrollPerPage : true,

          // Pagination
          pagination : true,
          paginationNumbers: false,

          // Responsive
          responsive: true,
          responsiveRefreshRate : 1,

          // Mouse Events
          dragBeforeAnimFinish : true,
          mouseDrag: true,
          touchDrag : true,

          // Misc
          addClassActive: true
        };
        scope.init = function () {
          scope.destroyCarousel();
          var options = scope.$eval($(element).attr('data-options')) || defaults;
          scope.sliderInstance = $(element).owlCarousel(options);
          $(element).trigger('owl.stop');
        };
        scope.destroyCarousel = function () {
          if (scope.sliderInstance && scope.sliderInstance.data('owlCarousel')) {
            scope.sliderInstance.data('owlCarousel').destroy();
            scope.sliderInstance = null;
          }
        };
        scope.$watch(attrs.watch, function (newVal, oldVal) {
          console.log('called', oldVal, newVal);
          if (newVal && newVal.length > 0) {
            scope.init();
          } else {
            scope.destroyCarousel();
          }
        }, true);
      }
    };
  });
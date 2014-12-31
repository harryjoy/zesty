'use strict';

angular.module('zesty')
  .directive('productPrice', function () {
  return {
    templateUrl: 'app/directives/productPrice/productPrice.html',
    restrict: 'EA',
    scope: {
      item: '=',
      moment: '='
    },
    link: function (scope, element, attrs) {
      scope.init = function() {
        if (!scope.item) { return; }
        var specialPrice = scope.item.specialPrice;
        scope.showSpecialPrice = false;
        scope.showRegularPrice = !attrs.showRegularPrice;
        scope.breakPoint = attrs.breakPoint;
        if (specialPrice && specialPrice !== '') {
          var specialPriceStartDate = scope.item.specialPriceStartDate;
          var specialPriceEndDate = scope.item.specialPriceEndDate;
          if (scope.item.isSpecialScheduled &&
            specialPriceStartDate && specialPriceEndDate &&
            specialPriceStartDate !== '' && specialPriceEndDate !== '') {
            scope.showSpecialPrice = (
              (scope.moment(specialPriceStartDate).diff(scope.moment(), 'days') <= 0) &&
              (scope.moment(specialPriceEndDate).diff(scope.moment(), 'days') >= 0)
              );
          } else {
            scope.showSpecialPrice = true;
          }
        }
      };
      scope.$watch('item', function(newVal) {
        scope.item = newVal;
        scope.init();
      });
    }
  };
});

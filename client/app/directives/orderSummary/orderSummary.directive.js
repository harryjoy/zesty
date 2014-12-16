'use strict';

angular.module('zesty')
  .directive('orderSummary', ['Auth', function (Auth) {
    return {
      templateUrl: 'app/directives/orderSummary/orderSummary.html',
      restrict: 'EA',
      link: function (scope) {
        /**
         * Apply entered promocode to cart.
         * @return {[type]} [description]
         */
        scope.applyPromoCode = function() {
          Auth.applyPromoCode(scope.promoCode);
        };

        scope.removeCode = Auth.removeCartCode;
      }
    };
  }]);
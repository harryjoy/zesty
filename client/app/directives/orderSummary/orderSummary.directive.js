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
          scope.invalidCodeError = false;
          Auth.applyPromoCode(scope.promoCode);
          scope.promoCode = '';
        };

        scope.removeCode = Auth.removeCartCode;
        scope.invalidCodeError = false;

        /**
         * Listen to invalid code error and display message accordingly.
         */
        scope.$on('cart.invalid.code', function() {
          scope.invalidCodeError = true;
          scope.promoCode = '';
        });
      }
    };
  }]);
'use strict';

angular.module('zesty')
  .directive('orderSummary', ['Auth', function (Auth) {
    return {
      templateUrl: 'app/directives/orderSummary/orderSummary.html',
      restrict: 'EA',
      link: function (scope) {
        scope.init = function() {
          scope.promoCodeInvalidMessage = 'Entered promo code is not valid.';
          scope.invalidCodeError = false;
        };

        /**
         * Apply entered promocode to cart.
         * @return {[type]} [description]
         */
        scope.applyPromoCode = function() {
          scope.init();
          Auth.applyPromoCode(scope.promoCode);
          scope.promoCode = '';
        };

        scope.removeCode = Auth.removeCartCode;
        scope.init(); // initialize the defaults.

        /**
         * Listen to invalid code error and display message accordingly.
         */
        scope.$on('cart.invalid.code', function(event, err) {
          if (err && err.data && err.data.isError) {
            scope.promoCodeInvalidMessage = err.data.message;
          }
          scope.invalidCodeError = true;
          scope.promoCode = '';
        });
      }
    };
  }]);
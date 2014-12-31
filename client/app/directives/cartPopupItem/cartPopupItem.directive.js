'use strict';

angular.module('zesty')
  .directive('cartPopupItem', ['Auth', 'ProductUtil', function (Auth, ProductUtil) {
  return {
    templateUrl: 'app/directives/cartPopupItem/cartPopupItem.html',
    restrict: 'E',
    scope: true,
    link: function (scope) {
      scope.deleteItem = Auth.removeItemFromCart;
      scope.calculatePrice = ProductUtil.calculatePrice;
      scope.calculateCartPrice = ProductUtil.calculateCartPrice;
    }
  };
}]);
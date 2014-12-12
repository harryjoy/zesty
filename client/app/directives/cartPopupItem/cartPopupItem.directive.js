'use strict';

angular.module('zesty')
  .directive('cartPopupItem', ['Auth', function (Auth) {
  return {
    templateUrl: 'app/directives/cartPopupItem/cartPopupItem.html',
    restrict: 'E',
    scope: true,
    link: function (scope) {
      scope.deleteItem = Auth.removeItemFromCart;
    }
  };
}]);
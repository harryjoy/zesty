'use strict';

angular.module('zesty')
  .controller('CartCtrl', ['$scope', 'Auth', function ($scope, Auth) {
 
  $scope.deleteItem = Auth.removeItemFromCart;
  $scope.updateCart = Auth.updateCart;
}]);

'use strict';

angular.module('fullApp')
  .controller('AccountCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);

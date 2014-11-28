'use strict';

angular.module('fullApp')
  .controller('AccountCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.isActiveMultiple = function(routes) {
      var match = false;
      var currentRoute = $location.path();
      $.each(routes, function (k, route) {
        if (-1 !== currentRoute.indexOf(route)) {
          match = true;
          return;
        }
      });
      return match;
    };
  }]);

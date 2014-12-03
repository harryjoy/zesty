'use strict';

angular.module('zesty')
  .controller('CheckoutCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
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

    Auth.isLoggedInAsync(function(loggedIn) {
      $scope.loggedIn = loggedIn;
    });
  }]);

'use strict';

angular.module('fullApp')
  .controller('CheckoutCtrl', ['$scope', '$location', function ($scope, $location) {
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

'use strict';

angular.module('zesty')
  .controller('CartCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
    $scope.checkout = function() {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (!loggedIn) {
          $location.path('/auth');
        } else {
          $location.path('/checkout');
        }
      });
    };
  }]);

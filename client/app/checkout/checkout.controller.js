'use strict';

angular.module('zesty')
  .controller('CheckoutCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    Auth.isLoggedInAsync(function(loggedIn) {
      $scope.loggedInNow = loggedIn;
    });
  }]);

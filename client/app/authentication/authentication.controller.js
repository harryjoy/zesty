'use strict';

angular.module('zesty')
  .controller('AuthenticationCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if(loggedIn) { $location.path('/checkout'); }
    });
  }]);

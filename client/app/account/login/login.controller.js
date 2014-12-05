'use strict';

angular.module('zesty')
  .controller('LoginCtrl', ['$scope', 'Auth', '$location', '$window', '$rootScope',
    function ($scope, Auth, $location, $window, $rootScope) {

  $scope.user = {
    email: 'test@test.com',
    password: 'test'
  };
  $scope.errors = {};

  $scope.login = function(form) {
    $scope.submitted = true;

    if(form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then( function() {
        // Logged in, redirect to home
        $rootScope.$broadcast('login.success');
        $location.path('/');
      })
      .catch( function(err) {
        $scope.errors.other = err.message;
        form.$valid = false;
      });
    }
  };

  $scope.loginOauth = function(provider) {
    $window.location.href = '/auth/' + provider;
  };
}]);

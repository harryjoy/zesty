'use strict';

angular.module('zesty')
  .controller('BaseCtrl', ['$scope', '$location', 'Auth',
    function ($scope, $location, Auth) {

    $scope.moment = moment;
    
    $scope.appName = 'Zesty';
    $scope.siteName = 'Zesty';
    $scope.siteSeller = 'General Store';

    $scope.isLoggedInFunc = Auth.isLoggedIn;
    $scope.user = Auth.getCurrentUser();
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.$on('user.updated', function() {
      $scope.user = Auth.getCurrentUser();
    });
    $scope.$on('login.success', function() {
      $scope.user = Auth.getCurrentUser();
    });

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
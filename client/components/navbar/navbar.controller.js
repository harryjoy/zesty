'use strict';

angular.module('fullApp')
  .controller('NavbarCtrl', ['$scope', '$location', 'Auth', 'DashboardServ',
    function ($scope, $location, Auth, DashboardServ) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Deals',
      'link': '/deals'
    },{
      'title': 'New',
      'link': '/new'
    }];
    $scope.cartItems = '';
    $scope.appName = 'Zesty';

    DashboardServ.categories().then(function(items) {
        $scope.categories = items;
      });

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
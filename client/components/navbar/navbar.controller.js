'use strict';

angular.module('zesty')
  .controller('NavbarCtrl', ['$scope', '$location', 'Auth', 'CategoryServ',
    function ($scope, $location, Auth, CategoryServ) {
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

  CategoryServ.query().$promise.then(function(categories) {
    $scope.categories = categories;
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

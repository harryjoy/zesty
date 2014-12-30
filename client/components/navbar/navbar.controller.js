'use strict';

angular.module('zesty')
  .controller('NavbarCtrl', ['$scope', '$location', 'Auth', 'CategoryServ', 'ProductServ', 'ProductUtil',
    function ($scope, $location, Auth, CategoryServ, ProductServ, ProductUtil) {
  $scope.menu = [{
    'title': 'Deals',
    'link': '/deals'
  },{
    'title': 'New',
    'link': '/new'
  }];
  $scope.cartItems = '';
  $scope.popularItems = [];
  $scope.newItems = [];

  CategoryServ.query().$promise.then(function(categories) {
    $scope.categories = categories;
  });

  ProductServ.featured({
    pageSize: 5
  }).$promise.then(function(items) {
    if (items && items.length > 0) {
      $.each(items, function (key, item) {
        $scope.popularItems.push(ProductUtil.convertItem(item));
      });
    }
  });
  ProductServ.query({
    pageSize: 5
  }).$promise.then(function(items) {
    if (items && items.length > 0) {
      $.each(items, function (key, item) {
        $scope.newItems.push(ProductUtil.convertItem(item));
      });
    }
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
}]).directive('scrollNavFixed', function ($window) {
  return function(scope, element) {
    var offset = $(element).offset().top;
    angular.element($window).bind('scroll', function() {
      if (this.pageYOffset >= offset - 30) {
        scope.onTop = true;
      } else {
        scope.onTop = false;
      }
      scope.$apply();
    });
  };
});

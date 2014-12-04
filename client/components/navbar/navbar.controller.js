'use strict';

angular.module('zesty')
  .controller('NavbarCtrl', ['$scope', '$location', 'Auth', 'CategoryServ', 'ProductServ',
    function ($scope, $location, Auth, CategoryServ, ProductServ) {
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

    $scope.items = [];
    ProductServ.query().$promise.then(function(items) {
        $.each(items, function (key, item) {
          $scope.items.push({
            'link': '/product/' + item._id,
            'title': item.title,
            'price': item.currency + ' ' + item.price,
            'reviewCount': item.reviews ? item.reviews : 0,
            'description': item.description,
            'categories': item.categories,
            'mainImage': item.mainImage,
            'rating': item.rating ? item.rating : 0
          });
        });
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
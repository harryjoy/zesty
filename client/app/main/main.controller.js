'use strict';

angular.module('zesty')
  .controller('MainCtrl', ['$scope', '$http', 'socket',
    'CategoryServ', 'Auth', 'ProductServ', 'FavoriteServ', 'ProductUtil',
    function ($scope, $http, socket, CategoryServ, Auth, ProductServ, FavoriteServ, ProductUtil) {

  var Item = {
    getItems: function () {
      $scope.loading = true;
      var queryParams = {
        pageSize: 9
      };
      if ($scope.items && $scope.items.length > 0) {
        queryParams.time = $scope.items[$scope.items.length - 1].updated;
      }
      ProductServ.query(queryParams).$promise.then(function (items) {
        if (items && items.length > 0) {
          $.each(items, function (key, item) {
            $scope.items.push(ProductUtil.convertItem(item));
          });
          if ($scope.loggedIn) {
            $scope.checkForProductFav();
          }
        } else {
          $scope.noMoreItems = true;
        }
        $scope.loading = false;
      }).catch (function (err) {
        $scope.errors = err;
        $scope.noMoreItems = true;
        $scope.loading = false;
      });
    }
  };

  $scope.loading = false;
  $scope.noMoreItems = false;

  $scope.loadMore = function () {
    Item.getItems();
  };

  $scope.items = [];
  $scope.slides = [];
  $scope.popularItems = [];
  $scope.slides = {};
  Item.getItems();
  
  CategoryServ.query({
    limit: 20
  }).$promise.then(function(categories) {
    $scope.categories = categories;
  });

  ProductServ.featured({
    pageSize: 12
  }).$promise.then(function(items) {
    if (items && items.length > 0) {
      var i = 0, k = 0;
      var tempCollection = [];
      $.each(items, function (key, item) {
        $scope.popularItems.push(ProductUtil.convertItem(item));
        tempCollection.push(ProductUtil.convertItem(item));
        i++;
        if (i === 4) {
          $scope.slides[k++] = angular.copy(tempCollection);
          _.remove(tempCollection);
          i = 0;
        }
      });
      if (i > 0) {
        $scope.slides[k++] = angular.copy(tempCollection);
      }
    }
  });

  Auth.isLoggedInAsync(function(loggedIn) {
    $scope.loggedIn = loggedIn;
    if (!loggedIn) {
      $scope.showSignupOffer = true;
    } else {
      $scope.checkForProductFav();
    }
  });

  $scope.checkForProductFav = function() {
    if ($scope.items && $scope.items.length > 0) {
      var productIds = [];
      $.each($scope.items, function(k, item) {
        productIds.push(item._id);
      });
      FavoriteServ.checkForProducts({
        productId: productIds
      }, function (favs) {
        if (favs && favs.length > 0) {
          $.each($scope.items, function(k, item) {
            var myFav = false;
            $.each(favs, function(k, fav) {
              if (fav.productId === item._id) {
                myFav = true;
              }
            });
            item.myFav = myFav;
          });
        }
      }, function (err) {
        console.log(err);
      });
    }
  };

}]);

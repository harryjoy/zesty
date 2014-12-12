'use strict';

angular.module('zesty')
  .controller('MainCtrl', ['$scope', '$http', 'socket',
    'CategoryServ', 'Auth', 'ProductServ', 'FavoriteServ',
    function ($scope, $http, socket, CategoryServ, Auth, ProductServ, FavoriteServ) {

  var Item = {
    getItems: function () {
      $scope.loading = true;
      var queryParams = {};
      if ($scope.items && $scope.items.length > 0) {
        queryParams.time = $scope.items[$scope.items.length - 1].updated;
      }
      ProductServ.query(queryParams).$promise.then(function (items) {
        if (items && items.length > 0) {
          $.each(items, function (key, item) {
            $scope.items.push(Item.convertToItem(item));
            var imgUrl = 'http://placehold.it/1250x400/5cb85c/ffffff&text=' + item.title;
            if (key % 3 === 0) {
              imgUrl = 'http://placehold.it/1250x400/428bca/ffffff&text=' + item.title;
            } else if (key % 3 === 1) {
              imgUrl = 'http://placehold.it/1250x400/d9534f/ffffff&text=' + item.title;
            }
            $scope.slides.push({
              image: imgUrl,
              title: item.title,
              text: item.description
            });
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
    },
    convertToItem: function (item) {
      return {
        '_id': item._id,
        'link': '/product/' + item._id,
        'title': item.title,
        'currency': item.currency,
        'price': item.price,
        'reviewCount': item.reviews ? item.reviews : 0,
        'description': item.description,
        'categories': item.categories,
        'mainImage': item.mainImage,
        'rating': item.rating ? item.rating : 0,
        'updated': item.createdAt
      };
    }
  };

  $scope.loading = false;
  $scope.noMoreItems = false;

  $scope.loadMore = function () {
    Item.getItems();
  };

  $scope.items = [];
  $scope.slides = [];
  Item.getItems();
  
  CategoryServ.query().$promise.then(function(categories) {
    $scope.categories = categories;
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

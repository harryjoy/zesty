'use strict';

angular.module('zesty')
  .controller('CategoryCtrl', ['$scope', '$stateParams', 'CategoryServ', 'Auth', 'FavoriteServ', 'ProductUtil',
    function ($scope, $stateParams, CategoryServ, Auth, FavoriteServ, ProductUtil) {

  var categoryId = $stateParams.id;
  CategoryServ.get({id: categoryId}).$promise.then(function(category) {
    $scope.category = category;
  });
  $scope.items = [];
  $scope.customerId = '';
  $scope.loggedIn = Auth.isLoggedIn();
  if ($scope.loggedIn) {
    $scope.customerId = $scope.getCurrentUser()._id;
  }
  CategoryServ.items({id: categoryId}).$promise.then(function(items) {
    if (items && items.length > 0) {
      $.each(items, function (key, item) {
        $scope.items.push(ProductUtil.convertItem(item));
      });
      if ($scope.loggedIn) {
        $scope.checkForProductFav();
      }
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

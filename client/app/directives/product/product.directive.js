'use strict';

angular.module('zesty')
  .directive('product', ['ProductServ', 'AlertServ', 'Auth', function (ProductServ, AlertServ, Auth) {
  return {
    templateUrl: 'app/directives/product/product.html',
    restrict: 'E',
    scope: true,
    link: function (scope, element) {
      var small = $(element).attr('small');
      if (small) {
        scope.sizeClass = 'col-sm-4 col-md-3';
      } else {
        scope.sizeClass = 'col-sm-6 col-md-4';
      }

      scope.toogleFav = function() {
        if (!scope.loggedIn) {
          AlertServ.alert('Please login to system for adding an product to wishlist.');
          return false;
        }
        var productId = scope.item._id;
        if (scope.item.myFav) {
          ProductServ.removeFavorite({
            id: productId
          }, function() {
            scope.item.myFav = false;
          }, function(err) {
            console.log(err);
            AlertServ.alert('Error while removing wishlist, please try again later.');
          });
        } else {
          var fav = {
            productId: productId,
            customerId: scope.getCurrentUser()._id
          };
          ProductServ.addToFavorite({
            id: productId
          }, fav, function(favorite) {
            if (favorite) {
              scope.item.myFav = true;
            }
          }, function(err) {
            console.log(err);
            AlertServ.alert('Error while adding to wishlist, please try again later.');
          });
        }
      };

      scope.addToCart = Auth.addItemToCart;
    }
  };
}]);
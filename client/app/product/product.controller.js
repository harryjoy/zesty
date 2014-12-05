'use strict';

angular.module('zesty')
  .controller('ProductCtrl', ['$scope', '$stateParams', 'ProductServ',
    function ($scope, $stateParams, ProductServ) {
  var productId = $stateParams.id;

  $scope.one = $scope.two = $scope.three = $scope.four = $scope.five = 0;

  ProductServ.get({id: productId}).$promise.then(function(product) {
    if (!product) {
      throw new Error('No product details found for selected item.');
    }
    $scope.itemDetails = {
      'id': product._id,
      'link': '/product/' + product._id,
      'title': product.title,
      'price': product.currency + ' ' + product.price,
      'reviewsCount': product.reviews ? product.reviews : 0,
      'description': product.description,
      'summary': product.summary,
      'mainImage': product.mainImage,
      'images': product.images,
      'rating': product.rating ? product.rating : 0,
      'suppliers': product.suppliers
    };
    $scope.largeImageSrc = $scope.itemDetails.mainImage;
  }).then(function() {
    $scope.items = [];
    ProductServ.related({id: productId}).$promise.then(function(items) {
      if (items && items.length > 0) {
        $.each(items, function (key, item) {
          $scope.items.push({
            'link': '/product/' + item._id,
            'title': item.title,
            'price': item.currency + ' ' + item.price,
            'reviews': item.reviews ? item.reviews : 0,
            'description': item.description,
            'categories': item.categories,
            'mainImage': item.mainImage,
            'rating': item.rating ? item.rating : 0
          });
        });
      } else {
        throw new Error('No related products found for this product.');
      }
    }).catch(function (err) {
      $scope.productRelatedGetError = true;
      $scope.relatedError = err;
    });
  }).then(function () {
    ProductServ.reviews({id: productId}).$promise.then(function(reviews) {
      if (reviews && reviews.length > 0) {
        $scope.itemReviews = reviews;
      } else {
        throw new Error('No reviews found for this product.');
      }

      ProductServ.ratings({id: productId}).$promise.then(function(ratings) {
        $.each(ratings, function (key, result) {
          if (result._id === 1) {
            $scope.one = result.count;
          } else if (result._id === 2) {
            $scope.two = result.count;
          } else if (result._id === 3) {
            $scope.three = result.count;
          } else if (result._id === 4) {
            $scope.four = result.count;
          } else if (result._id === 5) {
            $scope.five = result.count;
          }
        });
      });

    }).catch(function (err) {
      $scope.productReviewGetError = true;
      $scope.rewviewError = err;
    });
  }).catch(function (err) {
    $scope.productGetError = true;
    $scope.error = err;
  });

  $scope.displayLargeImg = function (src) {
    $scope.largeImageSrc = src;
  };
}]);

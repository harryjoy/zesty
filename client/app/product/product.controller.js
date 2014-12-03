'use strict';

angular.module('zesty')
  .controller('ProductCtrl', ['$scope', '$stateParams', 'ProductServ',
    function ($scope, $stateParams, ProductServ) {
    var productId = $stateParams.id;

    ProductServ.details(productId).then(function (product) {
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
    });
        
    $scope.displayLargeImg = function (src) {
      $scope.largeImageSrc = src;
    };

    $scope.items = [];
    ProductServ.related(productId).then(function(items) {
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
    });

    ProductServ.reviews(productId).then(function (reviews) {
      $scope.itemReviews = reviews;
    });
  }]);

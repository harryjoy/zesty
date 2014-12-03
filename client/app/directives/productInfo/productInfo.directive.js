'use strict';

angular.module('zesty')
  .directive('productInfo', function () {
    return {
      templateUrl: 'app/directives/productInfo/productInfo.html',
      restrict: 'EA',
      link: function (scope) {
        scope.product = {
          title: 'Call Of Fame',
          description: 'This is product description for call of fame.',
          price: 800,
          discountedPrice: 649,
          priceUnit: 'Rs.',
          summary: 'this is product summary',
          mainImage: 'http://placehold.it/400x400',
          images: ['http://placehold.it/300x300', 'http://placehold.it/500x500', 'http://placehold.it/600x600']
        };

        scope.largeImageSrc = scope.product.mainImage;
        
        scope.displayLargeImg = function (src) {
          scope.largeImageSrc = src;
        };
      }
    };
  });
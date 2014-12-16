'use strict';

angular.module('zesty.utils')
  .factory('ProductUtil', [function () {
  return {
    convertItem: function (product) {
      return {
        '_id': product._id,
        'link': '/product/' + product._id,
        'title': product.title,
        'currency': product.currency,
        'price': product.price,
        'reviewsCount': product.reviews ? product.reviews : 0,
        'description': product.description,
        'summary': product.summary,
        'mainImage': product.mainImage,
        'images': product.images,
        'rating': product.rating ? product.rating : 0,
        'suppliers': product.suppliers,
        'categories': product.categories,
        'updated': product.createdAt
      };
    }
  };
}]);
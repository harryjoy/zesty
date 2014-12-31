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
        'updated': product.createdAt,
        'createdAt': product.createdAt,
        'active': product.active,
        'productType': product.productType,
        'specialPrice': product.specialPrice,
        'isSpecialDiscount': product.isSpecialDiscount,
        'featured': product.featured,
        'specialPriceStartDate': product.specialPriceStartDate,
        'specialPriceEndDate': product.specialPriceEndDate,
        'isSpecialScheduled': product.isSpecialScheduled
      };
    },
    calculatePrice: function(product) {
      var price = product.price;
      if (product.specialPrice && product.specialPrice !== '' && product.specialPrice > 0) {
        var spPrice = product.specialPrice;
        if (product.isSpecialDiscount) {
          spPrice = product.price - ((product.specialPrice * product.price) / 100);
        }
        if (product.isSpecialScheduled) {
          var date = moment();
          if ((moment(product.specialPriceStartDate).diff(date, 'days') <= 0) &&
            (moment(product.specialPriceEndDate).diff(date, 'days') >= 0)) {
            price = spPrice;
          }
        } else {
          price = spPrice;
        }
      }
      return price;
    },
    calculateCartPrice: function(product) {
      return this.calculatePrice(product) * product.qty;
    }
  };
}]);
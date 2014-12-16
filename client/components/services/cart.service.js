'use strict';

angular.module('zesty')
  .factory('CartServ', ['$resource', function ($resource) {
  
  return {
    convertItem: function (item) {
      return {
        _id: item._id,
        title: item.title,
        description: item.description,
        qty: 1,
        price: item.price,
        currency: item.currency,
        img: item.mainImage
      };
    },
    resource: function () {
      return $resource('/api/carts/:id/:controller', {
        id: '@_id'
      },
      {
        items: {
          method: 'GET',
          params: {
            controller:'items'
          },
          isArray:true
        },
        addToCart: {
          method: 'POST',
          params: {
            controller:'items'
          }
        },
        removeFromCart: {
          method: 'DELETE',
          params: {
            controller:'items'
          }
        },
        update: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        },
        promocode: {
          method: 'POST',
          params: {
            id: '@id',
            controller: 'promocode'
          }
        },
        removecode: {
          method: 'DELETE',
          params: {
            id: '@id',
            controller: 'promocode'
          }
        }
      });
    }
  };
}]);

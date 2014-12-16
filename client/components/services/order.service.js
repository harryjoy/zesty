'use strict';

angular.module('zesty')
  .factory('OrderServ', ['$resource', function ($resource) {
  return $resource('/api/orders/:id/:controller', {
    id: '@_id'
  },
  {
    payment: {
      method: 'POST',
      params: {
        id: '@id',
        controller:'payment'
      }
    },
    getOrder: {
      method: 'GET',
      params: {
        id: 'by',
        controller: 'customer'
      }
    },
    update: {
      method: 'PUT',
      params: {
        id: '@id'
      }
    }
  });
}]);

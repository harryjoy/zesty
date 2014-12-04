'use strict';

angular.module('zesty')
  .factory('ProductServ', ['$resource', function ($resource) {
    return $resource('/api/items/:id/:controller', {
      id: '@_id'
    },
    {
      reviews: {
        method: 'GET',
        params: {
          controller:'reviews'
        },
        isArray:true
      },
      related: {
        method: 'GET',
        params: {
          controller:'related'
        },
        isArray:true
      }
    });
  }]);

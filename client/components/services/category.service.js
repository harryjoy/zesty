'use strict';

angular.module('zesty')
  .factory('CategoryServ', ['$resource', function ($resource) {
    return $resource('/api/categories/:id/:controller', {
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
      update: {
        method: 'PUT',
        params: {
          id: '@id'
        }
      },
      deleteMulti :{
        method: 'DELETE',
        params: {
          'id': 'delete'
        }
      }
    });
  }]);

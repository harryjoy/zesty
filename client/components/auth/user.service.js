'use strict';

angular.module('zesty')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller/:childId/:childController', {
      id: '@_id',
      childId: '@childId'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      update: {
        method: 'PUT'
      },
      addAddress: {
        method: 'POST',
        params: {
          controller: 'addresses'
        }
      },
      editAddress: {
        method: 'PUT',
        params: {
          controller: 'addresses'
        }
      },
      makeAddressDefault: {
        method: 'PUT',
        params: {
          id: '@id',
          controller: 'addresses',
          childController: 'default'
        }
      },
      deleteAddress: {
        method: 'DELETE',
        params: {
          id: '@id',
          controller: 'addresses'
        }
      }
	  });
  });

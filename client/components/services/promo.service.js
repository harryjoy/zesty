'use strict';

angular.module('zesty')
  .factory('PromoCodeServ', ['$resource', function ($resource) {
  return $resource('/api/promocodes/:id/:controller', {
    id: '@_id'
  },
  {
    check: {
      method: 'GET',
      params: {
        controller:'check'
      }
    }
  });
}]);

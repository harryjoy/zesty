'use strict';

angular.module('zesty')
  .factory('FavoriteServ', ['$resource', function ($resource) {
    return $resource('/api/favorites/:id/:controller', {
      id: '@_id'
    },{
      check: {
        method: 'GET',
        params: {
          id: 'checkForFav'
        }
      }
    });
  }]);

'use strict';

angular.module('zesty')
  .factory('ReviewServ', ['$resource', function ($resource) {
    return $resource('/api/reviews/:id', {
      id: '@_id'
    });
  }]);

'use strict';

angular.module('zesty')
  .factory('ReviewVoteServ', ['$resource', function ($resource) {
    return $resource('/api/review-votes/:id/:controller', {
      id: '@_id'
    });
  }]);

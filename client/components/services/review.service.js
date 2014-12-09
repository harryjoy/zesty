'use strict';

angular.module('zesty')
  .factory('ReviewServ', ['$resource', function ($resource) {
    return $resource('/api/reviews/:id/:controller', {
      id: '@_id'
    },{
      addVote: {
        method: 'POST',
        params: {
          controller: 'vote'
        }
      }
    });
  }]);

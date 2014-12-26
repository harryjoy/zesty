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
      addReview: {
        method: 'POST',
        params: {
          controller:'reviews'
        }
      },
      related: {
        method: 'GET',
        params: {
          controller:'related'
        },
        isArray:true
      },
      ratings: {
        method: 'GET',
        params: {
          controller:'ratings'
        },
        isArray:true
      },
      editReview: {
        method: 'PUT',
        params: {
          controller:'reviews'
        }
      },
      addToFavorite: {
        method: 'POST',
        params: {
          controller:'favorite'
        }
      },
      removeFavorite: {
        method: 'DELETE',
        params: {
          controller:'favorite'
        }
      },
      search: {
        method: 'GET',
        params: {
          id:'search'
        },
        isArray:true
      }
    });
  }]);

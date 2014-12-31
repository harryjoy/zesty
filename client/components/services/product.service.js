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
        controller: 'reviews'
      },
      isArray:true
    },
    addReview: {
      method: 'POST',
      params: {
        controller: 'reviews'
      }
    },
    related: {
      method: 'GET',
      params: {
        controller: 'related'
      },
      isArray:true
    },
    ratings: {
      method: 'GET',
      params: {
        controller: 'ratings'
      },
      isArray:true
    },
    editReview: {
      method: 'PUT',
      params: {
        controller: 'reviews'
      }
    },
    addToFavorite: {
      method: 'POST',
      params: {
        controller: 'favorite'
      }
    },
    removeFavorite: {
      method: 'DELETE',
      params: {
        controller: 'favorite'
      }
    },
    search: {
      method: 'GET',
      params: {
        id: 'search'
      },
      isArray:true
    },
    featured: {
      method: 'GET',
      params: {
        id: 'featured'
      },
      isArray:true
    },
    deleteIt: {
      method: 'DELETE',
      params: {
        controller: 'delete'
      }
    },
    recover: {
      method: 'POST',
      params: {
        id: '@id',
        controller: 'recover'
      }
    },
    counts: {
      method: 'GET',
      params: {
        id: 'counts'
      }
    },
    deleteMultiple: {
      method: 'DELETE',
      params: {
        id: 'detele-mutiple'
      }
    },
    recoverMultiple: {
      method: 'POST',
      params: {
        id: 'recover-mutiple'
      }
    },
    publishMultiple: {
      method: 'POST',
      params: {
        id: 'publish-mutiple'
      }
    }
  });
}]);

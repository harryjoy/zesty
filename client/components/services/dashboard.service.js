'use strict';

angular.module('zesty')
  .service('DashboardServ', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    return {
      items: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        
        $http.get('/api/items').success(function(data) {
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));
        return deferred.promise;
      },
      categories: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        
        $http.get('/api/categories').success(function(data) {
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));
        return deferred.promise;
      }
    };
  }]);

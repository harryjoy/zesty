'use strict';

angular.module('zesty')
  .service('ProductServ', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    return {
      details: function (productId, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        
        $http.get('/api/items/' + productId).success(function(data) {
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));
        return deferred.promise;
      },
      reviews: function (productId, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        
        $http.get('/api/items/' + productId + '/reviews').success(function(data) {
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));
        return deferred.promise;
      },
      related: function (productId, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        
        $http.get('/api/items/' + productId + '/related').success(function(data) {
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

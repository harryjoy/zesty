'use strict';

angular.module('zesty')
  .service('CategoryServ', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    return {
      categories: function (callback) {
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
      },
      details: function (categoryId, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/api/categories/' + categoryId).success(function(data) {
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          deferred.reject(err);
          return cb(err);
        }.bind(this));
        return deferred.promise;
      },
      items: function (categoryId, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.get('/api/categories/' + categoryId + '/items').success(function(data) {
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

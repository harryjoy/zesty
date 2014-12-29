'use strict';

angular.module('zesty')
  .service('FileServ', ['$http', '$q', function ($http, $q) {
  return {
    readFile: function (path, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();
      $http.get(path).success(function(data) {
        deferred.resolve(data);
        return cb();
      }).
      error(function(err) {
        deferred.reject(err);
        return cb(err);
      }.bind(this));
      return deferred.promise;
    },
    getImageList: function(callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();
      $http.get('/api/upload').success(function(data) {
        deferred.resolve(data);
        return cb();
      }).
      error(function(err) {
        deferred.reject(err);
        return cb(err);
      }.bind(this));
      return deferred.promise;
    },
    getFileList: function(callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();
      $http.get('/api/upload/file').success(function(data) {
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

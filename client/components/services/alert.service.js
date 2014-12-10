'use strict';

angular.module('zesty')
  .factory('AlertServ', ['$window', '$q', function ($window, $q) {
    return {
      alert: function (message) {
        var defer = $q.defer();
        $window.alert(message);
        defer.resolve();
        return defer.promise;
      },
      prompt: function (message, defaultValue) {
        var defer = $q.defer();
        // The native prompt will return null or a string.
        var response = $window.prompt(message, defaultValue);
        if (response === null) {
          defer.reject();
        } else {
          defer.resolve( response );
        }
        return defer.promise;
      },
      confirm: function (message) {
        var defer = $q.defer();
        // The native confirm will return a boolean.
        if ($window.confirm(message)) {
          defer.resolve(true);
        } else {
          defer.reject(false);
        }
        return defer.promise;
      }
    };
  }]);

/**
 * Usage Examples
 * ====================================================
 *  // Use injected alert.
 *  AlertServ.alert( "Hecks to the yea!" ).then(
 *   function() {
 *    console.log( "Alert accomplished" );
 *  });
 *
 *  // Use injected prompt.
 *  AlertServ.prompt( "Are you beginning to see the possibilities?", "Yes" ).then(
 *   function( response ) {
 *    console.log( "Prompt accomplished with", response );
 *   },
 *   function() {
 *    console.log( "Prompt failed :(" );
 *  });
 *
 *  // Use injected confirm.
 *  AlertServ.confirm( "Has it come to this?" ).then(
 *   function( response ) {
 *    console.log( "Confirm accomplished with", response );
 *   },
 *   function() {
 *    console.log( "Confirm failed :(" );
 *  });
 */
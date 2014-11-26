'use strict';

angular.module('fullApp')
  .directive('addressForm', function () {
    return {
      templateUrl: 'app/directives/address/address.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
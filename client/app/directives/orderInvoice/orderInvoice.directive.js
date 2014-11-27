'use strict';

angular.module('fullApp')
  .directive('orderInvoice', function () {
    return {
      templateUrl: 'app/directives/orderInvoice/orderInvoice.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
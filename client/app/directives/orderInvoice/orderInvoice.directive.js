'use strict';

angular.module('zesty')
  .directive('orderInvoice', function () {
    return {
      templateUrl: 'app/directives/orderInvoice/orderInvoice.html',
      restrict: 'E',
      scope: {
        order: '='
      }
    };
  });
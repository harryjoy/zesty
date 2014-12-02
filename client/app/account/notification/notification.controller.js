'use strict';

angular.module('fullApp')
  .controller('NotificationCtrl', ['$scope',
    function ($scope) {

  $scope.notifications= [{
    type: 1,
    date: '1 month ago',
    notes: 'Your shipment for order #123 has been shipped successfully to desired address.' +
      'Hope you enjoy the poroduct.' +
      ' And as its COD please arrange necessary cash with you.'
  }, {
    type: 3,
    date: '1 month ago',
    notes: 'Your order for HP is confirmed.'
  }, {
    type: 4,
    date: '2 months ago',
    notes: 'You got EGift Voucher from us worth 500. Happy Shopping.'
  }, {
    type: 2,
    date: '2 months ago',
    notes: 'Your shipment for order #123 will be delivered today and as its COD' +
      'please arrange necessary cash with you.' +
      'Your shipment for order #123 will be delivered today and as its COD' +
      'please arrange necessary cash with you.'
  }];

}]);

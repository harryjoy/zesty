'use strict';

angular.module('fullApp')
  .controller('NetBankingCtrl', ['$scope',
    function ($scope) {
  $scope.banks = [{
    id: '1',
    name: 'Axis Bank'
  }, {
    id: '2',
    name: 'HDFC Bank'
  }, {
    id: '3',
    name: 'SBI'
  }, {
    id: '4',
    name: 'ICICI'
  }];
}]);

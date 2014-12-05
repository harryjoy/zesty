'use strict';

angular.module('zesty')
  .controller('WalletCtrl', ['$scope',
    function ($scope) {

  $scope.wallet = {
    totalBalance: 100,
    usedBalance: 240,
    earnedBalance: 340,
    unit: 'Rs'
  };
  
}]);

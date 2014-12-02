'use strict';

angular.module('zesty')
  .controller('WalletCtrl', ['$scope',
    function ($scope) {

  $scope.siteName = 'Zesty';
  $scope.siteSeller = 'General Store';
  $scope.wallet = {
    totalBalance: 100,
    usedBalance: 240,
    earnedBalance: 340,
    unit: 'Rs'
  };
  
}]);

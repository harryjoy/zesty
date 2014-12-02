'use strict';

angular.module('zesty')
  .controller('SubscriptionCtrl', ['$scope',
    function ($scope) {

  $scope.siteName = 'Zesty';
  $scope.siteSeller = 'General Store';
  $scope.user= {
    subscription: 1
  };

}]);

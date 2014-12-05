'use strict';

angular.module('zesty')
  .controller('SubscriptionCtrl', ['$scope',
    function ($scope) {

  $scope.user= {
    subscription: 1
  };

  $scope.moment = moment;

}]);

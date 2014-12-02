'use strict';

angular.module('zesty')
  .controller('SavedCardCtrl', ['$scope',
    function ($scope) {

  $scope.siteName = 'Zesty';
  $scope.firstTime = false;

  $scope.cards = [{
    number: '5432-xxxx-xxxx-xx65',
    type: 1,
    name: 'Harsh Raval',
    expiryDate: '10/19',
    label: 'SBI card'
  }, {
    number: '5432-xxxx-xxxx-xx65',
    type: 2,
    name: 'Harsh Raval',
    expiryDate: '10/19',
    label: 'SBI card'
  }, {
    number: '5432-xxxx-xxxx-xx65',
    type: 0,
    name: 'Harsh Raval',
    expiryDate: '10/19',
    label: 'SBI card'
  }];

}]);

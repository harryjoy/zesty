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
    number: '5417-xxxx-xxxx-xx99',
    type: 2,
    name: 'Harsh Raval',
    expiryDate: '12/19',
    label: 'HDFC card'
  }, {
    number: '5487-xxxx-xxxx-xx32',
    type: 0,
    name: 'Harsh Raval',
    expiryDate: '10/18',
    label: 'Axis card'
  }];

  $scope.newCard = {};

  $scope.openEdit = function (card) {
    $scope.newCard = card;
    $scope.showAddForm = true;
  };

}]);

'use strict';

angular.module('zesty')
  .controller('SavedCardCtrl', ['$scope', 'Auth', 'User',
    function ($scope, Auth, User) {

  $scope.cardTypes = [{
    name: '-',
    val: 0
  }, {
    name: 'Visa',
    val: 1
  }, {
    name: 'MasterCard',
    val: 2
  }];

  $scope.newCard = {};
  $scope.isEdit = false;
  $scope.submitted = false;
  $scope.showLoader = false;
  $scope.showAddForm = true;
  $scope.formTitle = 'Add new card';

  $scope.openEdit = function (card) {
    $scope.newCard = card;
    $scope.showAddForm = true;
    $scope.formTitle = 'Edit card';
    $scope.isEdit = true;
  };

  $scope.closeAddForm = function () {
    $scope.newCard = {};
    $scope.showAddForm = false;
    $scope.isEdit = false;
    $scope.submitted = false;
    $scope.showLoader = false;
    $scope.formTitle = 'Add new card';
  };

  $scope.addNewCard = function (form) {
    $scope.submitted = true;
    if (form.$valid) {
      $scope.showLoader = true;
      if (!$scope.isEdit) {
        User.addCard({id: $scope.user._id}, $scope.newCard).$promise.then(function (user) {
          Auth.setCurrentUser(user);
          $scope.closeAddForm();
        }).catch(function (err) {
          console.log(err);
          $scope.showLoader = false;
          window.alert('Error while adding card, please try again later.');
        });
      } else {
        User.editCard({id: $scope.user._id}, $scope.newCard).$promise.then(function (user) {
          Auth.setCurrentUser(user);
          $scope.closeAddForm();
        }).catch(function (err) {
          console.log(err);
          $scope.showLoader = false;
          window.alert('Error while editing card, please try again later.');
        });
      }
    }
  };

  $scope.deleteCard = function (cardId) {
    User.deleteCard({id: $scope.user._id, childId: cardId}).$promise.then(function (user) {
      Auth.setCurrentUser(user);
      if ($scope.isEdit) {
        $scope.closeAddForm();
      }
    }).catch(function (err) {
      console.log(err);
      window.alert('Error while deleting card, please try again later.');
    });
  };

}]);

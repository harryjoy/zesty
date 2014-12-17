'use strict';

angular.module('zesty')
  .controller('CartSettingsCtrl', ['$scope', 'User', 'Auth',
  function ($scope, User, Auth) {

  $scope.submitted = false;
  $scope.updateLimitsLoader = false;
  
  $scope.updateLimits = function(form) {
    $scope.submitted = true;
    if (form.$valid) {
      $scope.updateLimitsLoader = true;
      User.update({id: $scope.user._id}, {
        cartLimits: $scope.user.cartLimits
      }).$promise.then(function (user) {
        Auth.setCurrentUser(user);
        $scope.updateLimitsLoader = false;
      }).catch(function (err) {
        console.log(err);
        $scope.errors.other = 'Error while updating budget settings, please try again later.';
        $scope.updateLimitsLoader = false;
      });
    }
  };
}]);


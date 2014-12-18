'use strict';

angular.module('zesty')
  .controller('SettingsCtrl', ['$scope', 'User', 'Auth', '$timeout',
    function ($scope, User, Auth, $timeout) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        if ($scope.user.newPassword === $scope.user.confirmPassword) {
          Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
          .then( function() {
            $scope.message = 'Password successfully changed.';
            $timeout(function() {
              $scope.message = '';
            }, 3000);
            $scope.submitted = false;
            $scope.user.newPassword = $scope.user.confirmPassword = $scope.user.oldPassword = '';
          })
          .catch( function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect current password, please try again.';
            $scope.message = '';
          });
        } else {
          form.newPassword.$setValidity('mongoose', false);
          form.confirmPassword.$setValidity('mongoose', false);
          $scope.errors.other = 'Entered new password and confirm password do not match.';
          $scope.message = '';
        }
      }
		};

    $scope.getCurrentUser = Auth.getCurrentUser;
  }]);

'use strict';

angular.module('zesty')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        if ($scope.user.password !== $scope.user.confrimPassword) {
          $scope.errors = {
            other: 'Entered passwords do not match. Please make sure you enter same password in both password boxes.'
          };
          form.$valid = false;
        } else {
          Auth.createUser({
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then( function() {
            // Account created, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        }
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });

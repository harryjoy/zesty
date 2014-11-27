'use strict';

angular.module('fullApp').controller('AddressPopupCtrl', ['$scope', '$modalInstance', 'address',
  function ($scope, $modalInstance, address) {
    $scope.address = address;
    $scope.ok = function () {
      $modalInstance.close($scope.address);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
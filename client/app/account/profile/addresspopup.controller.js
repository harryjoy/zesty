'use strict';

angular.module('fullApp').controller('AddressPopupCtrl', ['$scope', '$modalInstance', 'address', 'title',
  function ($scope, $modalInstance, address, title) {
  	$scope.popup = {
  		'title' : title
  	};
    $scope.address = address;
    $scope.ok = function () {
      $modalInstance.close($scope.address);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
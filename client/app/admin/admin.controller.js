'use strict';

angular.module('zesty.admin')
  .controller('AdminCtrl', ['$scope', function ($scope) {

  $scope.productSubMenuVisible = $scope.isActiveMultiple(['/admin/products', '/admin/categories', '/admin/add-product']);

}]);

'use strict';

angular.module('zesty')
  .controller('InvoiceCtrl', ['$scope', 'OrderServ', '$stateParams', 'OrderUtil',
      function ($scope, OrderServ, $stateParams, OrderUtil) {

  OrderServ.get({
    id: $stateParams.id
  }, function(order) {
    $scope.order = OrderUtil.convertOrderForInvoice(order, $scope.siteName, $scope.orderFrom,
      $scope.getOrderInvoiceNumber(order.orderNumber),
      $scope.getOrderDisplayNumber(order.orderNumber),
      $scope.moment(order.orderDate).format($scope.dateFormate),
      $scope.moment(order.paymentDate).format($scope.smDateFormate));
  });

}]);

'use strict';

angular.module('zesty')
  .controller('OrderCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnDefBuilder',
      function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap()
      .withOption('info', false).withOption('order', [1, 'desc']);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4).notSortable()
      ];
    $scope.orders = [{
      id: 'E123',
      date: '2 Nov 2014',
      price: 'Rs 1298',
      status: '1'
    },{
      id: 'E347',
      date: '1 Nov 2014',
      price: 'Rs 213',
      status: '1'
    },{
      id: 'E000',
      date: '13 Oct 2014',
      price: 'Rs 456',
      status: '2'
    },{
      id: 'E789',
      date: '20 Jan 2014',
      price: 'Rs 1233',
      status: '3'
    },{
      id: 'E456',
      date: '21 Feb 2014',
      price: 'Rs 665',
      status: '2'
    }];
  }]);

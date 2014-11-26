'use strict';

angular.module('fullApp')
  .controller('OrderTableCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnDefBuilder',
      function ($scope, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap()
      .withOption('info', false).withOption('order', [1, 'desc']);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable().withOption('class', 'details-control'),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5).notSortable()
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

    function format(d) {
      if (d && d.length > 1) {
        return '<span class="detailed_row">' + d[1] + ' ' + d[2] + '</span>';
      }
      return false;
    }

    var detailRows = [];

    $scope.$on('event:dataTableLoaded', function() {
      var dt = $('#order_data_table').DataTable();
      $('#order_data_table tbody').unbind('click');
      $('#order_data_table tbody tr td:first-child').unbind('click');
      $('#order_data_table tbody').on('click', 'tr td:first-child', function () {
        var tr = $(this).closest('tr');
        var row = dt.row(tr);
        var idx = $.inArray(tr.attr('id'), detailRows);

        if (row.child.isShown()) {
          tr.removeClass('details');
          row.child.hide();

          // Remove from the 'open' array
          detailRows.splice( idx, 1 );
        } else {
          tr.addClass('details');
          row.child(format(row.data())).show();
          

            // Add to the 'open' array
          if (idx === -1) {
            detailRows.push(tr.attr('id'));
          }
        }
      });

      // On each draw, loop over the `$scope.orders` array and show any child rows
      dt.on( 'draw', function () {
        $.each( detailRows, function (i, id) {
            $('#'+id+' td:first-child').trigger('click');
          });
      });
    });
  }]);

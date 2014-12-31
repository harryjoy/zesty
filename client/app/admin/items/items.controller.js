'use strict';

angular.module('zesty.admin')
  .controller('AdminItemsCtrl', ['$scope', 'ProductServ', 'ProductUtil',
    'DTOptionsBuilder', 'DTColumnDefBuilder', 'CategoryServ',
  function ($scope, ProductServ, ProductUtil, DTOptionsBuilder, DTColumnDefBuilder, CategoryServ) {

  $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap()
    .withOption('info', false).withOption('order', [1, 'asc'])
    .withOption('bPaginate', false).withDOM('none');
  $scope.dtColumnDefs = [
    DTColumnDefBuilder.newColumnDef(0).notSortable(),
    DTColumnDefBuilder.newColumnDef(1),
    DTColumnDefBuilder.newColumnDef(2),
    DTColumnDefBuilder.newColumnDef(3),
    DTColumnDefBuilder.newColumnDef(4),
    DTColumnDefBuilder.newColumnDef(5),
    DTColumnDefBuilder.newColumnDef(6),
    DTColumnDefBuilder.newColumnDef(7).notSortable(),
    DTColumnDefBuilder.newColumnDef(8).notSortable()
  ];
  $scope.pageSize = 10;

  CategoryServ.query().$promise.then(function(categories) {
    $scope.categories = categories;
  });

  var Item = {
    getItems: function () {
      $scope.loading = true;
      var queryParams = {
        pageSize: $scope.pageSize
      };
      if ($scope.items && $scope.items.length > 0) {
        queryParams.time = $scope.items[$scope.items.length - 1].updated;
      }
      ProductServ.query(queryParams).$promise.then(function (items) {
        if (items && items.length > 0) {
          $.each(items, function (key, item) {
            $scope.items.push(ProductUtil.convertItem(item));
          });
        } else {
          $scope.noMoreItems = true;
        }
        $scope.loading = false;

        // check if initial items are less than what we queried
        if ($scope.items.length < $scope.pageSize) {
          $scope.noMoreItems = true;
        }
      }).catch (function (err) {
        $scope.errors = err;
        $scope.noMoreItems = true;
        $scope.loading = false;
      });
    }
  };

  $scope.loading = false;
  $scope.noMoreItems = false;

  $scope.loadMore = function () {
    Item.getItems();
  };

  $scope.items = [];
  Item.getItems();

}]);

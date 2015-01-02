'use strict';

angular.module('zesty.admin')
  .controller('AdminItemsCtrl', ['$scope', 'ProductServ', 'ProductUtil',
    'DTOptionsBuilder', 'DTColumnDefBuilder', 'CategoryServ', 'AlertServ', 'Modal',
  function ($scope, ProductServ, ProductUtil, DTOptionsBuilder, DTColumnDefBuilder, CategoryServ, AlertServ, Modal) {

  $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap()
    .withOption('info', false).withOption('order', [6, 'desc'])
    .withOption('bPaginate', false).withDOM('none')
    .withOption('language', {'emptyTable': 'No data available.'});
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

  $scope.loading = false;
  $scope.noMoreItems = false;
  $scope.checkAll = false;
  $scope.items = [];
  $scope.prSelection = 1;
  $scope.prType = -1;
  $scope.prCategory = -1;
  $scope.counts = {
    all: 0,
    published: 0,
    deleted: 0
  };
  $scope.pageSize = 10;

  var Item = {
    getItems: function () {
      $scope.loading = true;
      var queryParams = {
        pageSize: $scope.pageSize
      };
      if ($scope.items && $scope.items.length > 0) {
        queryParams.time = $scope.items[$scope.items.length - 1].updated;
      }
      if ($scope.prSelection === 2) {
        queryParams.published = true;
      } else if ($scope.prSelection === 3) {
        queryParams.isDeleted = true;
      }
      if ($scope.searchItem && $scope.searchItem !== '') {
        queryParams.productName = $scope.searchItem;
      }
      if ($scope.prType && $scope.prType + '' !== '-1') {
        queryParams.productType = $scope.prType;
      }
      if ($scope.prCategory && $scope.prCategory + '' !== '-1') {
        queryParams.category = $scope.prCategory;
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

        // check if items are less than what we queried in a page
        if (items.length < $scope.pageSize) {
          $scope.noMoreItems = true;
        }
      }).catch (function (err) {
        $scope.errors = err;
        $scope.noMoreItems = true;
        $scope.loading = false;
      });
    },
    init: function() {
      if ($scope.items) {
        _.remove($scope.items);
      }
      $scope.noMoreItems = false;
      Item.getItems();
    }
  };

  $scope.loadMore = function () {
    Item.getItems();
  };

  $scope.$watch('prSelection', function() {
    if (!$scope.loading) {
      Item.init();
    }
  });

  $scope.$watch('prCategory', function() {
    if (!$scope.loading) {
      Item.init();
    }
  });

  $scope.$watch('prType', function() {
    if (!$scope.loading) {
      Item.init();
    }
  });

  $scope.getCounts = function() {
    ProductServ.counts().$promise.then(function(result) {
      if (result) { $scope.counts = result; }
    });
  };
  $scope.getCounts();

  CategoryServ.query().$promise.then(function(categories) {
    $scope.categories = categories;
  });

  /**
   * Delete a single products.
   * @param  {Object} reqItem Product to delete.
   */
  $scope.deleteItem = function(reqItem) {
    Modal.confirm.delete(function() { // callback when modal is confirmed
      ProductServ.deleteIt({
        id: reqItem._id
      }).$promise.then(function(item) {
        if (item) {
          _.pull($scope.items, reqItem);
          $scope.getCounts();
        }
      }).catch(function(err) {
        console.log(err);
        AlertServ.alert('Error while deleting item, please try again later.');
      });
    })(reqItem.title);
  };

  /**
   * Recover a single product.
   * @param  {Object} reqItem Product to recover.
   */
  $scope.recoverItem = function(reqItem) {
    Modal.confirm.recover(function() { // callback when modal is confirmed
      ProductServ.recover({
        id: reqItem._id
      }).$promise.then(function(item) {
        if (item) {
          _.pull($scope.items, reqItem);
          $scope.getCounts();
        }
      }).catch(function(err) {
        console.log(err);
        AlertServ.alert('Error while recovering item, please try again later.');
      });
    })(reqItem.title);
  };

  /**
   * Either delete or recover multiple products based on selected tab.
   */
  $scope.operateMultiple = function(str) {
    if ($scope.prSelection !== 3) {
      $scope.deleteMultiple(str);
    } else {
      $scope.recoverMultiple(str);
    }
  };

  /**
   * Delete multiple products at a time.
   */
  $scope.deleteMultiple = function(str) {
    var itemIds = [];
    if ($scope.items && $scope.items.length > 0) {
      _.forEach($scope.items, function(item) {
        if (item.checked) {
          itemIds.push(item._id);
        }
      });
    }
    if (itemIds && itemIds.length > 0) {
      Modal.confirm.delete(function() { // callback when modal is confirmed
        ProductServ.deleteMultiple({
          ids: itemIds
        }).$promise.then(function() {
          Item.init();
          $scope.checkAll = false;
          $scope.getCounts();
        }).catch(function(err) {
          console.log(err);
          AlertServ.alert('Error while deleting item(s), please try again later.');
        });
      })(str);
    } else {
      AlertServ.alert('Select atleast one product.');
    }
  };

  /**
   * Recover multiple products at a time.
   */
  $scope.recoverMultiple = function(str) {
    var itemIds = [];
    if ($scope.items && $scope.items.length > 0) {
      _.forEach($scope.items, function(item) {
        if (item.checked) {
          itemIds.push(item._id);
        }
      });
    }
    if (itemIds && itemIds.length > 0) {
      Modal.confirm.recover(function() { // callback when modal is confirmed
        ProductServ.recoverMultiple({
          ids: itemIds
        }).$promise.then(function() {
          Item.init();
          $scope.checkAll = false;
          $scope.getCounts();
        }).catch(function(err) {
          console.log(err);
          AlertServ.alert('Error while recovering item(s), please try again later.');
        });
      })(str);
    } else {
      AlertServ.alert('Select atleast one product.');
    }
  };

  /**
   * Publish multiple products at a time.
   */
  $scope.publishMultiple = function(str) {
    var itemIds = [];
    if ($scope.items && $scope.items.length > 0) {
      _.forEach($scope.items, function(item) {
        if (item.checked) {
          itemIds.push(item._id);
        }
      });
    }
    if (itemIds && itemIds.length > 0) {
      Modal.confirm.publish(function() { // callback when modal is confirmed
        ProductServ.publishMultiple({
          ids: itemIds
        }).$promise.then(function() {
          Item.init();
          $scope.checkAll = false;
          $scope.getCounts();
        }).catch(function(err) {
          console.log(err);
          AlertServ.alert('Error while publishing item(s), please try again later.');
        });
      })(str);
    } else {
      AlertServ.alert('Select atleast one product.');
    }
  };

  /**
   * Check/Uncheck all products at once.
   */
  $scope.$watch('checkAll', function(newVal){
    if ($scope.items && $scope.items.length > 0) {
      _.forEach($scope.items, function(item) {
        item.checked = newVal;
      });
    }
  });

}]);

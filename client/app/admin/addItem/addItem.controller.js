'use strict';

angular.module('zesty.admin')
  .controller('AdminAddItemsCtrl', ['$scope', 'CategoryServ', 'ProductServ',
  function ($scope, CategoryServ, ProductServ) {

  $scope.loading = false;
  $scope.selection = 1;
  $scope.product = {
    specialPriceStartDate: moment().format('DD-MMMM-YYYY'),
    specialPriceEndDate: moment().format('DD-MMMM-YYYY'),
    type: 1,
    currency: 'Rs'
  };

  $('#summary').wysihtml5({
    toolbar: {
      image: false,
      blockquote: false,
      size: 'sm',
      fa: true
    }
  });

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    showWeeks: false
  };
  $scope.minDate = moment().format('DD-MMMM-YYYY');
  $scope.openStartDatePicker = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startOpened = !$scope.startOpened;
  };
  $scope.openEndDatePicker = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.endOpened = !$scope.endOpened;
  };

  $scope.categories = [];
  CategoryServ.query().$promise.then(function(categories) {
    $scope.categories = categories;
  });

  // Call search api for the product.
  $scope.searchProducts = function(val) {
    return ProductServ.search({
      name: val,
      pageSize: 25
    }).$promise.then(function(response) {
      if (response && response.length > 0) {
        return response.map(function(item) {
          return item.title;
        });
      }
      return [];
    });
  };

  $scope.opts = {
    minimumInputLength: 3,
    maximumSelectionSize: 3,
    multiple: true,
    ajax: {
      url: '/api/items/search',
      data: function(term, page) {
        return {
          name: term || '',
          pageSize: 25,
          pageNumber: page - 1
        };
      },
      results: function(data) {
        // var response = [];
        // _.forEach(data, function(item) {
        //   response.push({
        //     id: item._id,
        //     text: item.title
        //   });
        // });
        // return {
        //   results: response
        // };
        return {
          results: data
        };
      }
    },
    formatResult: function(obj) {
      return obj.title;
    },
    formatSelection: function(obj) {
      return obj.title;
    },
    id: function(data) {
      return data._id;
    },
    initSelection: function() {
    }
  };

  $scope.products = [];
  // function to get products based on user's entered value.
  $scope.refreshProducts = function(val) {
    if (!val || val.length < 3) {
      $scope.products = [];
      return;
    }
    ProductServ.search({
      name: val,
      pageSize: 25
    }).$promise.then(function(response) {
      if (response && response.length > 0) {
        $scope.products = response;
      }
    });
  };

}]);

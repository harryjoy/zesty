'use strict';

angular.module('zesty.admin')
  .controller('AdminAddItemsCtrl', ['$scope', 'CategoryServ', 'ProductServ', 'Uploader',
  function ($scope, CategoryServ, ProductServ, Uploader) {

  $scope.loading = false;
  $scope.selection = 3;
  $scope.products = $scope.categories = $scope.images = [];
  $scope.errors = $scope.attr = $scope.category = {};
  $scope.product = {
    specialPriceStartDate: moment().format('DD-MMMM-YYYY'),
    specialPriceEndDate: moment().format('DD-MMMM-YYYY'),
    type: 1,
    currency: 'Rs',
    images: [],
    attrs: []
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

  CategoryServ.query().$promise.then(function(categories) {
    $scope.categories = categories;
  });

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

  // add new category
  $scope.addNewCategory = function() {
    $scope.errors.categorySuccess = $scope.errors.category = '';
    if(!$scope.category.name || $scope.category.name === '') {
      $scope.errors.category = 'Category name can not be blank.';
    } else {
      $scope.category.slug = $scope.getSlugFromName($scope.category.name);
      var match = false;
      _.forEach($scope.categories, function(category) {
        if (angular.lowercase(category.name) === angular.lowercase($scope.category.name)) {
          match = true;
          return false;
        }
      });
      if (match) {
        $scope.errors.category = 'Category already exist.';
      } else {
        CategoryServ.save($scope.category, function(category) {
          $scope.categories.push(category);
          $scope.category = {};
          $scope.errors.categorySuccess = 'Category added successfully.';
        });
      }
    }
  };

  // open image selector
  $scope.openImageUploder = Uploader.openImageSelector(false, false, {
    images: $scope.images
  }, function(selected) {
    $scope.product.mainImage = selected;
    _.remove($scope.images);
    $scope.images.push(selected);
  });
  $scope.openGalleryUploder = Uploader.openImageSelector(false, true, {
    images: $scope.product.images
  }, function(selected) {
    if (selected) {
      $.each(selected, function(k) {
        $scope.product.images.push(k);
      });
    }
  });
  $scope.removeMainImage = function() {
    $scope.product.mainImage = undefined;
    _.remove($scope.images);
  };
  $scope.removeImage = function(img) {
    _.pull($scope.product.images, img);
  };

  // add new custom attribute to product.
  $scope.addCustomAttr = function() {
    $scope.errors.attr = '';
    if(!$scope.attr.name || $scope.attr.name === '') {
      $scope.errors.attr = 'Attribute name can not be blank.';
    } else if (!$scope.attr.values || $scope.attr.values === '') {
      $scope.errors.attr = 'Attribute values can not be blank.';
    } else {
      $scope.product.attrs.push($scope.attr);
      $scope.attr = {};
    }
  };
  // remove custom attribute of product.
  $scope.removeCustomAttr = function(attr) {
    _.pull($scope.product.attrs, attr);
  };

}]);

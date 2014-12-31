'use strict';

angular.module('zesty.admin')
  .controller('AdminAddItemsCtrl', ['$scope', 'CategoryServ', 'ProductServ', 'Uploader', 'AlertServ',
  function ($scope, CategoryServ, ProductServ, Uploader, AlertServ) {

  $scope.loading = $scope.isEdit = $scope.submitted = $scope.success = false;
  $scope.selection = 1;
  $scope.products = $scope.categories = $scope.images = [];
  $scope.errors = $scope.attr = $scope.category = {};

  // initial product setup.
  $scope.product = {
    specialPriceStartDate: moment().format('DD-MMMM-YYYY'),
    specialPriceEndDate: moment().format('DD-MMMM-YYYY'),
    productType: 1,
    currency: 'Rs',
    images: [],
    attrs: [],
    categories: [],
    files: {
      items: []
    },
    isSpecialDiscount: false,
    active: true,
    searchable: true,
    reviewEnabled: true,
    featured: false,
    isSpecialScheduled: false,
    deleted: false
  };

  // watch for changes in product name while adding new product
  // to auto add slug for the product.
  $scope.$watch('product.title', function(newValue) {
    if (!$scope.isEdit) {
      $scope.product.slug = $scope.getSlugFromName(angular.lowercase(newValue));
    }
  });

  // special price date settings
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
          $scope.product.categories.push(category);
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
      $.each(selected, function(k, val) {
        if (val) {
          $scope.product.images.push(k);
        }
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
  // edit custom attribute.
  $scope.editCustomAttr = function(attr) {
    $scope.removeCustomAttr(attr);
    $scope.attr = attr;
  };

  // open file selector.
  $scope.openFileUploder = Uploader.openFileSelector(true, {
    files: $scope.product.files.items
  }, function(selected) {
    $scope.errors.download = '';
    if (selected) {
      $.each(selected, function(k, val) {
        if (val) {
          $scope.product.files.items.push(k);
        }
      });
    }
  });
  // remove files from product file array.
  $scope.removeFile = function(file) {
    _.pull($scope.product.files.items, file);
  };

  $scope.submitProduct = function(form) {
    $scope.submitted = true;
    $scope.errors.summary = $scope.errors.download = '';
    if ($scope.product.productType === 3) {
      if ($scope.product.files.items.length === 0) {
        $scope.errors.download = 'Please select at least one file that can be attached' +
        'to product for user to download after purchase.';
        form.$valid = false;
      }
      if ($scope.product.files.limits < 0) {
        if ($scope.errors.download !== '') {
          $scope.errors.download += '<br/>';
        }
        $scope.errors.download += 'Pleaes enter limit value as 0 or grater than 0.';
        form.$valid = false;
      }
      if ($scope.product.files.expiration < 0) {
        if ($scope.errors.download !== '') {
          $scope.errors.download += '<br/>';
        }
        $scope.errors.download += 'Pleaes enter expiration time value as 0 or grater than 0.';
        form.$valid = false;
      }
    }
    if (!$scope.product.summary || $scope.product.summary === '' ||
      !$scope.product.categories || $scope.product.categories.length === 0 ||
      !$scope.product.mainImage || $scope.product.mainImage === '') {
      form.$valid = false;
    }
    if (form.$valid) {
      $scope.loading = true;
      $scope.submitted = $scope.success = false;
      $scope.product.slug = $scope.getSlugFromName(angular.lowercase($scope.product.slug));
      if ($scope.isEdit) {
        ProductServ.update({
          id: $scope.product._id
        }, $scope.product, function(product) {
          $scope.product = product;
          $scope.loading = false;
          $scope.success = true;
        }, function(err) {
          console.log(err);
          AlertServ.alert('Error while updating product, please try again later.');
          $scope.loading = false;
        });
      } else {
        ProductServ.save($scope.product, function(product) {
          $scope.product = product;
          $scope.loading = false;
          $scope.success = true;
        }, function(err) {
          console.log(err);
          AlertServ.alert('Error while saving product, please try again later.');
          $scope.loading = false;
        });
      }
    }
  };

}]);

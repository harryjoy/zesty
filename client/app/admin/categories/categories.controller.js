'use strict';

angular.module('zesty.admin')
  .controller('AdminCategoriesCtrl', ['$scope', 'CategoryServ', 'DTOptionsBuilder',
    'DTColumnDefBuilder', 'Modal', 'AlertServ', 'Uploader',
    function ($scope, CategoryServ, DTOptionsBuilder, DTColumnDefBuilder, Modal, AlertServ, Uploader) {

  // options for data tables.
  $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap()
    .withOption('info', false).withOption('order', [6, 'desc'])
    .withOption('bPaginate', false);
  $scope.dtColumnDefs = [
    DTColumnDefBuilder.newColumnDef(0).notSortable(),
    DTColumnDefBuilder.newColumnDef(1).notSortable()
  ];

  // initialize category list
  $scope.init = function() {
    $scope.categoriesLoading = true;
    CategoryServ.query({
      productCounts: true
    }).$promise.then(function(categories) {
      $scope.categories = categories;
      $scope.categoriesLoading = false;
    });
    $scope.category = {};
    $scope.imageMissing = $scope.submitted = $scope.isEdit = false;
  };

  $scope.init();

  // open dialog for add category.
  $scope.addCategory = function() {
    $scope.category = {};
    $scope.imageMissing = $scope.submitted = $scope.isEdit = false;
  };

  // open dialog for edit category.
  $scope.editCategory = function(category) {
    $scope.category = angular.copy(category);
    $scope.imageMissing = $scope.submitted = false;
    $scope.isEdit = true;
    // scroll to form heading for editing
    $('html, body').animate({
      scrollTop: $('#category-form-header').offset().top
    }, 500);
  };

  // open dialog for edit category.
  $scope.duplicateCategory = function(category) {
    $scope.category = angular.copy(category);
    $scope.category.name = $scope.category.name + ' (Copy)';
    $scope.category.slug = $scope.getCategorySlugFromName(angular.lowercase($scope.category.name));
    $scope.category.updatedAt = new Date();
    $scope.category._id = undefined;
    $scope.isEdit = $scope.imageMissing = $scope.submitted = false;
    $scope.showCategoryForm = true;
  };

  // open confirm dialog for deleting a category.
  $scope.deleteCategory = Modal.confirm.delete(function(categoryId) { // callback when modal is confirmed
    CategoryServ.remove({
      id: categoryId
    }, function() {
      angular.forEach($scope.categories, function(c, i) {
        if (c._id === categoryId) {
          $scope.categories.splice(i, 1);
        }
      });
    });
  });

  // check all categories.
  $scope.checkAllCatgory = function() {
    if ($scope.categories && $scope.categories.length > 0) {
      angular.forEach($scope.categories, function(category) {
        category.isChecked = $scope.allCheck;
      });
    }
  };

  // bulk delete categories.
  $scope.bulkDelete = function(str) {
    if ($scope.categories && $scope.categories.length > 0) {
      var categoryIds = [];
      angular.forEach($scope.categories, function(category) {
        if (category.isChecked) {
          categoryIds.push(category._id);
        }
      });
      if (categoryIds && categoryIds.length > 0) {
        Modal.confirm.delete(function() {
          CategoryServ.deleteMulti({
            ids: categoryIds
          }, function() {
            $scope.init();
          }, function(err) {
            console.log('err', err);
            AlertServ.alert('Error while removing categories, please try again later.');
          });
        })(str);
      } else {
        AlertServ.alert('Select at least one category.');
      }
    }
  };

  // add or update category based on isEdit flag.
  // this also validates icon is selected or not for category.
  $scope.submitCategory = function(form) {
    $scope.submitted = true;
    if ($scope.category.isIcon) {
      if (!$scope.category.image) {
        form.$valid = false;
        $scope.imageMissing = true;
      }
    }
    if (form.$valid) {
      $scope.category.slug = $scope.getCategorySlugFromName(angular.lowercase($scope.category.slug));
      if ($scope.isEdit) {
        CategoryServ.update({
          id: $scope.category._id
        }, $scope.category, function(category) {
          $scope.category = category;
          $scope.init();
        });
      } else {
        CategoryServ.save($scope.category, function(category) {
          $scope.category = category;
          $scope.init();
        });
      }
    }
  };

  // reset category form
  $scope.reset = function() {
    $scope.category = {};
    $scope.imageMissing = $scope.submitted = $scope.isEdit = false;
  };

  // remove category image
  $scope.removeCategoryImage = function() {
    $scope.category.image = undefined;
    $scope.category.isIcon = false;
  };

  // watch for changes in category name while adding new category
  // to auto add slug for the category.
  $scope.$watch('category.name', function(newValue) {
    if (newValue && !$scope.isEdit) {
      $scope.category.slug = $scope.getCategorySlugFromName(angular.lowercase($scope.category.name));
    }
  });

  // get category slug based on category name.
  $scope.getCategorySlugFromName = function(name) {
    if (!name) {
      return name;
    }
    return name.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-') // replace special characters
        .replace(/^(-)+|(-)+$/g,''); // replace trailing -
  };

  $scope.openUploder = Uploader.openImageSelector(function(selected, selection) {
    $scope.category.isIcon = (selection === 2);
    $scope.category.image = selected;
  });

}]);

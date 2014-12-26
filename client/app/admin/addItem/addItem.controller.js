'use strict';

angular.module('zesty.admin')
  .controller('AdminAddItemsCtrl', ['$scope', 'CategoryServ', 'ProductServ', 'Uploader',
  function ($scope, CategoryServ, ProductServ, Uploader) {

  $scope.loading = false;
  $scope.selection = 1;
  $scope.products = $scope.categories = $scope.images = [];
  $scope.product = {
    specialPriceStartDate: moment().format('DD-MMMM-YYYY'),
    specialPriceEndDate: moment().format('DD-MMMM-YYYY'),
    type: 1,
    currency: 'Rs',
    images: []
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

}]);

'use strict';

angular.module('zesty')
  .controller('ProductreviewsCtrl', ['$scope', '$stateParams', 'ProductServ', 'Auth',
    function ($scope, $stateParams, ProductServ, Auth) {

  /*
   * This is used to cache product review and do not make request 
   * for pages that has already been visited.
   */
  var ProductReviewCache = {
    pageData: {},
    addNewPage: function () {
      var self = this;
      ProductServ.reviews({
        id: productId,
        rate: reviewstyle,
        'pageNumber': $scope.currentPage - 1
      }).$promise.then(function(reviews) {
        if (reviews && reviews.length > 0) {
          self.pageData[$scope.currentPage] = reviews;
          $scope.itemReviews = reviews;
        }
      });
    },
    getPageData: function () {
      if (this.pageData[$scope.currentPage] && this.pageData[$scope.currentPage].length > 0) {
        $scope.itemReviews = this.pageData[$scope.currentPage];
      } else {
        this.addNewPage();
      }
    },
    setPageData: function (reviews) {
      this.pageData[$scope.currentPage] = reviews;
    }
  };

  var productId = $stateParams.id;
  var reviewstyle = $stateParams.reviewstyle;
  $scope.itemId = productId;
  $scope.noReviews = false;

  ProductServ.reviews({
    id: productId,
    rate: reviewstyle
  }).$promise.then(function(reviews) {
    $scope.noReviews = false;
    if (reviews && reviews.length > 0) {
      $scope.itemReviews = reviews;
      ProductReviewCache.setPageData(reviews);
    } else {
      throw new Error('No reviews found for this product.');
    }
  }).catch (function() {
    $scope.noReviews = true;
  });

  ProductServ.get({id: productId}).$promise.then(function(product) {
    if (!product) {
      throw new Error('No product details found for selected item.');
    }
    $scope.item = {
      'id': product._id,
      'link': '/product/' + product._id,
      'title': product.title,
      'image': product.mainImage,
      'decsription': product.description
    };
  }).catch (function() {
    $scope.noReviews = true;
  });

  $scope.totalItems = 0;
  ProductServ.ratings({id: productId}).$promise.then(function(ratings) {
    $.each(ratings, function (key, result) {
      if (reviewstyle === '1') {
        if (result._id === 1) {
          $scope.totalItems = result.count;
        }
      } else if (reviewstyle === '2') {
        if (result._id === 2 || result._id === 3) {
          $scope.totalItems += result.count;
        }
      } else if (reviewstyle === '4') {
        if (result._id === 4 || result._id === 5) {
          $scope.totalItems += result.count;
        }
      }
    });
  });

  $scope.customerId = '';
  Auth.isLoggedInAsync(function(loggedIn) {
    $scope.loggedInNow = loggedIn;
    if (loggedIn) {
      $scope.customerId = $scope.getCurrentUser()._id;
    }
  });

  $scope.pageChanged = function() {
    ProductReviewCache.getPageData();
  };

}]);

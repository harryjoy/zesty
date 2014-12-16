'use strict';

angular.module('zesty')
  .controller('ReviewCtrl', ['$scope', 'User', 'Auth',
    function ($scope, User, Auth) {

  /*
   * This is used to cache user review and do not make request 
   * for pages that has already been visited.
   */
  var UserReviewCache = {
    pageData: {},
    addNewPage: function () {
      var self = this;
      User.reviews({
        id: $scope.getCurrentUser()._id,
        pageNumber: $scope.currentPage - 1,
        pageSize: 3
      }).$promise.then(function(result) {
        if (result.data && result.data.length > 0) {
          self.pageData[$scope.currentPage] = result.data;
          $scope.reviews = result.data;
        }
      });
    },
    getPageData: function () {
      if (this.pageData[$scope.currentPage] && this.pageData[$scope.currentPage].length > 0) {
        $scope.reviews = this.pageData[$scope.currentPage];
      } else {
        this.addNewPage();
      }
    },
    setPageData: function (reviews) {
      this.pageData[$scope.currentPage] = reviews;
    }
  };

  $scope.totalItems = 0;
  $scope.currentPage = 1;
  $scope.ratingCount = 0;
  $scope.noReviews = false;
  $scope.recentRatings = [];
  $scope.reviews = [];
  $scope.first = $scope.two = $scope.three = $scope.four = $scope.five = 0;
  User.reviews({
    id: $scope.getCurrentUser()._id,
    pageSize: 3
  }).$promise.then(function(result) {
    if (result && result.data && result.data.length > 0) {
      $scope.reviews = result.data;
      $scope.totalItems = result.count;
      UserReviewCache.setPageData(result.data);

      $.each(result.data, function (k, review) {
        $scope.recentRatings.push({
          id: review.productId,
          image: review.product.image,
          title: review.product.title,
          rate: review.rating,
          description: review.product.description,
        });
      });
    } else {
      $scope.noReviews = true;
    }
  }).catch(function (err) {
    $scope.errors = err;
    $scope.noReviews = true;
  });
  User.ratings({id: $scope.getCurrentUser()._id}).$promise.then(function(ratings) {
    $.each(ratings, function (key, result) {
      if (result._id === 1) {
        $scope.first = result.count;
      } else if (result._id === 2) {
        $scope.two = result.count;
      } else if (result._id === 3) {
        $scope.three = result.count;
      } else if (result._id === 4) {
        $scope.four = result.count;
      } else if (result._id === 5) {
        $scope.five = result.count;
      }
      $scope.ratingCount += result.count;
    });
  });

  $scope.pageChanged = function() {
    UserReviewCache.getPageData();
  };

  $scope.customerId = '';
  Auth.isLoggedInAsync(function(loggedIn) {
    $scope.loggedInNow = loggedIn;
    if (loggedIn) {
      $scope.customerId = $scope.getCurrentUser()._id;
    }
  });

  $scope.sellerReviewExists = true;
  $scope.sellerReviewCount = 3;
  $scope.sellerReviews = [{
    seller: {
      name: 'General Store',
      id: '123'
    },
    rate: 3,
    comments: 'Good Service.',
    id: '1233',
    date: new Date()
  }, {
    seller: {
      name: 'Retail Store 1',
      id: '1234'
    },
    rate: 1,
    comments: 'Poor service and no response on call.',
    id: '1233',
    date: new Date()
  }, {
    seller: {
      name: 'Me & Mummy Fame Store',
      id: '345'
    },
    rate: 4,
    comments: 'Awesome service and people are very good. Awesome service and people are very good.' +
        'Awesome service and people are very good. Awesome service and people are very good.',
    id: '1233',
    date: new Date()
  }];

  $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
    $scope.scrollToTop();
  });

}]);

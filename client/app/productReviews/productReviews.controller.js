'use strict';

angular.module('zesty')
  .controller('ProductreviewsCtrl', ['$scope', '$stateParams', 'ProductServ', 'Auth', 'ReviewVoteServ',
    function ($scope, $stateParams, ProductServ, Auth, ReviewVoteServ) {

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
          self.getReviewVotes();
        }
      });
    },
    getReviewVotes: function () {
      var self = this;
      var reviewIdsToMatch = [];
      $.each($scope.itemReviews, function (k, review) {
        reviewIdsToMatch.push(review._id);
      });
      ReviewVoteServ.query({
        customerId: $scope.getCurrentUser()._id,
        reviewIds: reviewIdsToMatch
      }).$promise.then(function (votes) {
        $.each($scope.itemReviews, function (k, review) {
          $.each(votes, function (key, vote) {
            if (review._id === vote.reviewId) {
              review.voted = true;
              review.myVote = vote.vote;
            }
          });
        });
        self.pageData[$scope.currentPage] = $scope.itemReviews;
      });
    },
    getPageData: function () {
      if (this.pageData[$scope.currentPage] && this.pageData[$scope.currentPage].length > 0) {
        $scope.itemReviews = this.pageData[$scope.currentPage];
        this.getReviewVotes();
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
      ProductReviewCache.getReviewVotes();
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

  $scope.$on('review.vote', function(e, updated) {
    $.each($scope.itemReviews, function (k, review) {
      if(review._id === updated._id) {
        review = _.merge(review, updated);
      }
    });
    ProductReviewCache.setPageData($scope.itemReviews);
  });

}]);

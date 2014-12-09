'use strict';

angular.module('zesty')
  .controller('ProductCtrl', ['$scope', '$stateParams', 'ProductServ', 'Auth', 'ReviewVoteServ',
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
  $scope.first = $scope.two = $scope.three = $scope.four = $scope.five = 0;
  $scope.totalItems = 0;
  $scope.currentPage = 1;

  ProductServ.get({id: productId}).$promise.then(function(product) {
    if (!product) {
      throw new Error('No product details found for selected item.');
    }
    $scope.itemDetails = {
      'id': product._id,
      'link': '/product/' + product._id,
      'title': product.title,
      'price': product.currency + ' ' + product.price,
      'reviewsCount': product.reviews ? product.reviews : 0,
      'description': product.description,
      'summary': product.summary,
      'mainImage': product.mainImage,
      'images': product.images,
      'rating': product.rating ? product.rating : 0,
      'suppliers': product.suppliers
    };
    $scope.largeImageSrc = $scope.itemDetails.mainImage;
    $scope.totalItems = $scope.itemDetails.reviewsCount;
  }).then(function() {
    $scope.items = [];
    ProductServ.related({id: productId}).$promise.then(function(items) {
      if (items && items.length > 0) {
        $.each(items, function (key, item) {
          $scope.items.push({
            'link': '/product/' + item._id,
            'title': item.title,
            'price': item.currency + ' ' + item.price,
            'reviewCount': item.reviews ? item.reviews : 0,
            'description': item.description,
            'categories': item.categories,
            'mainImage': item.mainImage,
            'rating': item.rating ? item.rating : 0,
            'updated': item.createdAt
          });
        });
      } else {
        throw new Error('No related products found for this product.');
      }
    }).catch(function (err) {
      $scope.productRelatedGetError = true;
      $scope.relatedError = err;
    });
  }).then(function () {
    ProductServ.reviews({id: productId}).$promise.then(function(reviews) {
      if (reviews && reviews.length > 0) {
        $scope.itemReviews = reviews;
        ProductReviewCache.setPageData(reviews);
      } else {
        throw new Error('No reviews found for this product.');
      }

      ProductServ.ratings({id: productId}).$promise.then(function(ratings) {
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
        });
      });

      ProductReviewCache.getReviewVotes();
    }).catch(function (err) {
      $scope.productReviewGetError = true;
      $scope.rewviewError = err;
    });
  }).catch(function (err) {
    $scope.productGetError = true;
    $scope.error = err;
  });

  $scope.displayLargeImg = function (src) {
    $scope.largeImageSrc = src;
  };

  $scope.pageChanged = function() {
    ProductReviewCache.getPageData();
  };

  $scope.customerId = '';
  Auth.isLoggedInAsync(function(loggedIn) {
    $scope.loggedInNow = loggedIn;
    if (loggedIn) {
      $scope.customerId = $scope.getCurrentUser()._id;
    }
  });

  $scope.$on('review.vote', function(e, updated) {
    $.each($scope.itemReviews, function (k, review) {
      if(review._id === updated._id) {
        review = _.merge(review, updated);
      }
    });
    ProductReviewCache.setPageData($scope.itemReviews);
  });

}]);

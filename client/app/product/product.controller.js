'use strict';

angular.module('zesty')
  .controller('ProductCtrl', ['$scope', '$stateParams', 'ProductServ', 'Auth',
    'ReviewVoteServ', 'AlertServ', 'FavoriteServ', 'ProductUtil',
    function ($scope, $stateParams, ProductServ, Auth, ReviewVoteServ, AlertServ, FavoriteServ, ProductUtil) {

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
              if (vote.vote === 1 || vote.vote === 2) {
                review.voted = true;
                review.myVote = vote.vote;
              } else {
                review.abusedByMe = true;
              }
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
  $scope.isMyFav = false;
  $scope.addedToCart = false;

  $scope.customerId = '';
  $scope.loggedIn = Auth.isLoggedIn();
  if ($scope.loggedIn) {
    $scope.customerId = $scope.getCurrentUser()._id;
  }
  $scope.addToCart = Auth.addItemToCart;

  $scope.$on('cart.updated', function() {
    $scope.addedToCart = false;
    if ($scope.cart.products && $scope.cart.products.length > 0 && $scope.itemDetails) {
      _.forEach($scope.cart.products, function(currentProduct) {
        if (currentProduct._id === $scope.itemDetails._id) {
          $scope.addedToCart = true;
        }
      });
    }
  });

  ProductServ.get({id: productId}).$promise.then(function(product) {
    if (!product) {
      throw new Error('No product details found for selected item.');
    }
    $scope.itemDetails = ProductUtil.convertItem(product);
    $scope.largeImageSrc = $scope.itemDetails.mainImage;
    $scope.totalItems = $scope.itemDetails.reviewsCount;

    if ($scope.loggedIn) {
      FavoriteServ.check({
        productId: productId
      }).$promise.then(function(fav) {
        if (fav) {
          $scope.isMyFav = true;
        }
      }).catch(function(err) {
        console.log(err);
      });
    }

    if ($scope.cart.products && $scope.cart.products.length > 0) {
      _.forEach($scope.cart.products, function(currentProduct) {
        if (currentProduct._id === $scope.itemDetails._id) {
          $scope.addedToCart = true;
        }
      });
    }
  }).then(function() {
    $scope.items = [];
    ProductServ.related({id: productId}).$promise.then(function(items) {
      if (items && items.length > 0) {
        $.each(items, function (key, item) {
          $scope.items.push(ProductUtil.convertItem(item));
        });
        if ($scope.loggedIn) {
          $scope.checkForProductFav();
        }
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

  $scope.$on('review.vote', function(e, updated) {
    $.each($scope.itemReviews, function (k, review) {
      if(review._id === updated._id) {
        review = _.merge(review, updated);
      }
    });
    ProductReviewCache.setPageData($scope.itemReviews);
  });

  $scope.addToFavorite = function() {
    if ($scope.loggedIn) {
      var fav = {
        productId: productId,
        customerId: $scope.getCurrentUser()._id
      };
      ProductServ.addToFavorite({
        id: productId
      }, fav, function(favorite) {
        if (favorite) {
          $scope.isMyFav = true;
        }
      }, function(err) {
        console.log(err);
        AlertServ.alert('Error while adding to wishlist, please try again later.');
      });
    } else {
      AlertServ.alert('Please login to system for adding an product to wishlist.');
    }
  };

  $scope.removeFavorite = function() {
    if ($scope.loggedIn) {
      ProductServ.removeFavorite({
        id: productId
      }, function() {
        $scope.isMyFav = false;
      }, function(err) {
        console.log(err);
        AlertServ.alert('Error while removing wishlist, please try again later.');
      });
    } else {
      AlertServ.alert('Please login to system for adding an product to wishlist.');
    }
  };

  $scope.checkForProductFav = function() {
    if ($scope.items && $scope.items.length > 0) {
      var productIds = [];
      $.each($scope.items, function(k, item) {
        productIds.push(item._id);
      });
      FavoriteServ.checkForProducts({
        productId: productIds
      }, function (favs) {
        if (favs && favs.length > 0) {
          $.each($scope.items, function(k, item) {
            var myFav = false;
            $.each(favs, function(k, fav) {
              if (fav.productId === item._id) {
                myFav = true;
              }
            });
            item.myFav = myFav;
          });
        }
      }, function (err) {
        console.log(err);
      });
    }
  };

}]);

'use strict';

angular.module('zesty')
  .controller('WritereviewCtrl', ['$scope', '$stateParams', 'Auth', 'ProductServ', '$location', 'ReviewServ',
  function ($scope, $stateParams, Auth, ProductServ, $location, ReviewServ) {

  var productId = $stateParams.id;
  $scope.showFaq = true;
  ProductServ.get({id: productId}).$promise.then(function(product) {
    if (!product) {
      throw new Error('No product details found for selected item.');
    }
    $scope.item = {
      'id': product._id,
      'link': '/product/' + product._id,
      'title': product.title,
      'image': product.mainImage,
    };
  });

  $scope.reviewFaqs = [{
    question: 'Have you used this product?',
    answer: 'It is always better to review a product you have personally experienced.'
  }, {
    question: 'Educate your readers',
    answer: 'Provide a relevant, unbiased overview of the product. Readers are interested in the pros and the cons of the product.'
  }, {
    question: 'Be yourself, be informative',
    answer: 'Let your personality shine through, but it is equally important to provide facts to back up your opinion.'
  }, {
    question: 'Get your facts right!',
    answer: 'Nothing is worse than inaccurate information. If you are not really sure, research always helps.'
  }, {
    question: 'Stay concise',
    answer: 'Be creative but also remember to stay on topic. A catchy title will always get attention!'
  }, {
    question: 'Easy to read, easy on the eyes',
    answer: 'A quick edit and spell check will work wonders for your credibility. Also, break reviews into small, digestible paragraphs.'
  }];

  $scope.submitted = false;
  $scope.reviewLoader = false;
  $scope.reviewSubmitted = false;
  $scope.isEdit = false;
  $scope.customerId = '';
  $scope.review = {};
  $scope.errors = {};
  Auth.isLoggedInAsync(function(loggedIn) {
    $scope.loggedInNow = loggedIn;
    if (loggedIn) {
      $scope.review.name = $scope.getCurrentUser().firstName + ' ' + $scope.getCurrentUser().lastName;
      $scope.review.emailId = $scope.getCurrentUser().email;
      $scope.customerId = $scope.getCurrentUser()._id;
    }
  });
  if ($location.search()) {
    if ($location.search().review) {
      ReviewServ.get({id: $location.search().review}).$promise.then(function(review) {
        $scope.review = review;
        $scope.isEdit = true;
      });
    }
    if ($location.search().rate) {
      var rate = $location.search().rate;
      if (rate > 5) {
        rate = 5;
      }
      $scope.review.rating = rate;
    }
  }

  $scope.addReview = function (form) {
    $scope.submitted = true;
    if (form.$valid) {
      $scope.reviewLoader = true;
      if ($scope.isEdit) {
        ProductServ.editReview({id: productId}, $scope.review).$promise.then(function(review) {
          $scope.reviewLoader = false;
          $scope.reviewSubmitted = true;
          $scope.review = review;
        }).catch(function (err) {
          $scope.errors.other = err;
          $scope.reviewLoader = false;
        });
      } else {
        $scope.review.productId = productId;
        if ($scope.loggedInNow) {
          $scope.review.customerId = $scope.getCurrentUser()._id;
        }
        ProductServ.addReview({id: productId}, $scope.review).$promise.then(function(review) {
          $scope.reviewLoader = false;
          $scope.reviewSubmitted = true;
          $scope.review = review;
        }).catch(function (err) {
          $scope.errors.other = err;
          $scope.reviewLoader = false;
        });
      }
    }
  };

}]);

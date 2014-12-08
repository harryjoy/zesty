'use strict';

angular.module('zesty')
  .controller('WritereviewCtrl', ['$scope', '$stateParams', 'Auth', 'ProductServ',
  function ($scope, $stateParams, Auth, ProductServ) {

  var productId = $stateParams.id;
  $scope.showFaq = true;
  $scope.item = {
    id: productId,
    title: 'Call Of Fame',
    image: '../../assets/images/shopping_bag.png'
  };

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
  $scope.review = {};
  $scope.errors = {};
  Auth.isLoggedInAsync(function(loggedIn) {
    $scope.loggedInNow = loggedIn;
    if (loggedIn) {
      $scope.review.name = $scope.getCurrentUser().firstName + ' ' + $scope.getCurrentUser().lastName;
      $scope.review.emailId = $scope.getCurrentUser().email;
    }
  });

  $scope.addReview = function (form) {
    $scope.submitted = true;
    if (form.$valid) {
      $scope.reviewLoader = true;
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
  };

}]);

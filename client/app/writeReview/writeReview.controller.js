'use strict';

angular.module('zesty')
  .controller('WritereviewCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
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
  }]);

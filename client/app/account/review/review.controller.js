'use strict';

angular.module('zesty')
  .controller('ReviewCtrl', ['$scope',
    function ($scope) {

  $scope.ratingCount = 10;
  $scope.reviewCount = 8;
  $scope.recentRatings = [{
    id: 'E123',
    image: 'http://placehold.it/400x400',
    title: 'Call Of Fame',
    rate: '2',
    description: 'this is product description. this is product description.'
  },{
    id: 'E135',
    image: 'http://placehold.it/400x400',
    title: 'Getting it Done.',
    rate: '4',
    description: 'this is product description. this is product description.'
  },{
    id: 'E12345',
    image: 'http://placehold.it/400x400',
    title: 'Now you can see me!',
    rate: '3',
    description: 'this is product description. this is product description.'
  }];

  $scope.reviews = [{
    product: {
      id: 'E123',
      image: 'http://placehold.it/400x400',
      title: 'Call Of Fame',
      description: 'this is product description. this is product description.'
    },
    title: 'Good product to use',
    rate: 3,
    comments: 'This is really good product at this price. Worth it. Full value of money invested in it.' +
        'Playing this is also awesome.',
    helpful: 3,
    unhelpful: 1,
    id: '123',
    date: new Date()
  }, {
    product: {
      id: 'E123',
      image: 'http://placehold.it/400x400',
      title: 'Now you can see me!',
      description: 'this is product description. this is product description.'
    },
    title: 'Good product to use',
    rate: 4,
    comments: 'This is really good product at this price. Worth it. Full value of money invested in it.' +
        ' This is really good product at this price. Worth it. Full value of money invested in it.' +
        ' This is really good product at this price. Worth it. Full value of money invested in it.' +
        ' Playing this is also awesome.',
    helpful: 0,
    unhelpful: 0,
    id: '1223',
    date: new Date()
  }, {
    product: {
      id: 'E122313',
      image: 'http://placehold.it/400x400',
      title: 'Get with it.',
      description: 'this is product description. this is product description.'
    },
    title: 'Good product to use',
    rate: 2,
    comments: 'This is really good product at this price. Worth it. Full value of money invested in it.' +
        'Playing this is also awesome.',
    helpful: 1,
    unhelpful: 3,
    id: '1233',
    date: new Date()
  }];

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

}]);

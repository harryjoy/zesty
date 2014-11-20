'use strict';

angular.module('fullApp')
  .controller('ProductCtrl', ['$scope', '$stateParams', 'DashboardServ', 'ProductServ',
    function ($scope, $stateParams, DashboardServ, ProductServ) {
    var productId = $stateParams.id;

    $scope.items = [];
    DashboardServ.items().then(function(items) {
      $.each(items, function (key, item) {
        $scope.items.push({
          'link': '/product/' + item._id,
          'title': item.title,
          'price': item.currency + ' ' + item.price,
          'reviews': item.reviews ? item.reviews : 0,
          'description': item.description,
          'categories': item.categories,
          'mainImage': item.mainImage
        });
      });
    });

    ProductServ.details(productId).then(function (product) {
      $scope.itemDetails = {
        'link': '/product/' + product._id,
        'title': product.title,
        'price': product.currency + ' ' + product.price,
        'reviewsCount': product.reviews ? product.reviews : 0,
        'description': product.description,
        'summary': product.summary,
        'mainImage': product.mainImage,
        'images': product.images,
        'reviews': [{
            'name': 'Harsh Raval',
            'review': 'This is really good product.',
            'from': 'India',
            'time': moment().startOf('day').fromNow(),
            'star': 4
          }, {
            'name': 'Harsh Raval',
            'review': 'This is really good product but when it comes to internet and especially 3G this is not up to the mark.',
            'from': 'India',
            'time': moment().startOf('hour').fromNow(),
            'star': 3
          }, {
            'name': 'Harsh Raval',
            'review': 'Not available in this country.',
            'from': 'United States',
            'time': moment().startOf('month').fromNow(),
            'star': 1
          }]
        };
    });
  }]);

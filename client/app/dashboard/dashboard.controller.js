'use strict';

angular.module('fullApp')
  .controller('DashboardCtrl', function ($scope) {
    $scope.items = [{
        'link': '/product',
        'title': 'Airtel 3G',
        'price': 'Rs. 449',
        'reviews': 5,
        'description': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.'
      }, {
        'link': '/product',
        'title': 'Vodafone 3G',
        'price': 'Rs. 649',
        'reviews': 50,
        'description': 'This is product description for Vodafone.' +
                       'Vodafone is very good brand for mobile operators.'
      }];
    $scope.itemsDeals = [{
        'link': '/product',
        'title': 'Airtel 3G',
        'price': 'Rs. 449',
        'reviews': 5,
        'description': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.'
      }, {
        'link': '/product',
        'title': 'Vodafone 3G',
        'price': 'Rs. 649',
        'reviews': 50,
        'description': 'This is product description for Vodafone.' +
                       'Vodafone is very good brand for mobile operators.'
      }, {
        'link': '/product',
        'title': 'Airtel 3G',
        'price': 'Rs. 449',
        'reviews': 5,
        'description': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.'
      }, {
        'link': '/product',
        'title': 'Vodafone 3G',
        'price': 'Rs. 649',
        'reviews': 50,
        'description': 'This is product description for Vodafone.' +
                       'Vodafone is very good brand for mobile operators.'
      }];
    $scope.itemsHot = [{
        'link': '/product',
        'title': 'Airtel 3G',
        'price': 'Rs. 449',
        'reviews': 5,
        'description': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.'
      }, {
        'link': '/product',
        'title': 'Vodafone 3G',
        'price': 'Rs. 649',
        'reviews': 50,
        'description': 'This is product description for Vodafone.' +
                       'Vodafone is very good brand for mobile operators.'
      }, {
        'link': '/product',
        'title': 'Vodafone 3G',
        'price': 'Rs. 649',
        'reviews': 50,
        'description': 'This is product description for Vodafone.' +
                       'Vodafone is very good brand for mobile operators.'
      }];
  });

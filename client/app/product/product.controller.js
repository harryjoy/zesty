'use strict';

angular.module('fullApp')
  .controller('ProductCtrl', function ($scope) {
    $scope.items = [{
        'link': '#',
        'title': 'Airtel 3G',
        'price': 'Rs. 449',
        'reviews': 5,
        'description': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.'
      }, {
        'link': '#',
        'title': 'Vodafone 3G',
        'price': 'Rs. 649',
        'reviews': 50,
        'description': 'This is product description for Vodafone.' +
                       'Vodafone is very good brand for mobile operators.'
      }, {
        'link': '#',
        'title': 'Airtel 3G',
        'price': 'Rs. 449',
        'reviews': 5,
        'description': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.'
      }, {
        'link': '#',
        'title': 'Vodafone 3G',
        'price': 'Rs. 649',
        'reviews': 50,
        'description': 'This is product description for Vodafone.' +
                       'Vodafone is very good brand for mobile operators.'
      }];
    $scope.itemDetails = {
        'link': '#',
        'title': 'Airtel 3G',
        'price': 'Rs. 449',
        'reviewsCount': 5,
        'description': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.',
        'summary': 'This is product description for Airtel.' +
                       'Airtel is very good brand for mobile operators.' +
                       'Airtel is very good brand for mobile operators.' +
                       'Airtel is very good brand for mobile operators.' +
                       'Airtel is very good brand for mobile operators.' +
                       'Airtel is very good brand for mobile operators.' +
                       'Airtel is very good brand for mobile operators.' +
                       'Airtel is very good brand for mobile operators.',
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

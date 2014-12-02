'use strict';

angular.module('zesty')
  .controller('DashboardCtrl', ['$scope', 'DashboardServ', function ($scope, DashboardServ) {
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
  }]);

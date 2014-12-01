'use strict';

angular.module('fullApp')
  .controller('RecommendedCtrl', ['$scope', 'DashboardServ',
    function ($scope, DashboardServ) {

  $scope.siteName = 'Zesty';
  $scope.items = [];
  DashboardServ.items().then(function(items) {
    $.each(items, function (key, item) {
      $scope.items.push({
        'link': '/product/' + item._id,
        'title': item.title,
        'price': item.currency + ' ' + item.price,
        'reviewCount': item.reviews ? item.reviews : 0,
        'description': item.description,
        'categories': item.categories,
        'mainImage': item.mainImage,
        'rating': item.rating ? item.rating : 0
      });
    });
  });

}]);

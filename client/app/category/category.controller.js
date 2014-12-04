'use strict';

angular.module('zesty')
  .controller('CategoryCtrl', ['$scope', '$stateParams', 'CategoryServ',
	  function ($scope, $stateParams, CategoryServ) {
		var categoryId = $stateParams.id;
    CategoryServ.get({id: categoryId}).$promise.then(function(category) {
      $scope.category = category;
    });
    $scope.items = [];
    CategoryServ.items({id: categoryId}).$promise.then(function(items) {
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

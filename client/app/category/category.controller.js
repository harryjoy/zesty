'use strict';

angular.module('fullApp')
  .controller('CategoryCtrl', ['$scope', '$stateParams', 'CategoryServ',
	  function ($scope, $stateParams, CategoryServ) {
		var categoryId = $stateParams.id;
    CategoryServ.details(categoryId).then(function(category) {
        $scope.category = category;
      });
    $scope.items = [];
    CategoryServ.items(categoryId).then(function(items) {
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

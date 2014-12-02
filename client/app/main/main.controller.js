'use strict';

angular.module('zesty')
  .controller('MainCtrl', ['$scope', '$http', 'socket', 'DashboardServ', 'Auth',
    function ($scope, $http, socket, DashboardServ, Auth) {
    $scope.awesomeThings = [];

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.items = [];
    $scope.slides = [];
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
        $scope.slides.push({
          image: 'http://placehold.it/1250x400',
          title: item.title,
          text: item.description
        });
      });
    });
    DashboardServ.categories().then(function(items) {
      $scope.categories = items;
    });

    Auth.isLoggedInAsync(function(loggedIn) {
      if (!loggedIn) {
        $scope.showSignupOffer = true;
      }
    });

  }]);

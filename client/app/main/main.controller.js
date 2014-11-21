'use strict';

angular.module('fullApp')
  .controller('MainCtrl', ['$scope', '$http', 'socket', 'DashboardServ',
    function ($scope, $http, socket, DashboardServ) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

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
    DashboardServ.categories().then(function(items) {
        $scope.categories = items;
      });
  }]);

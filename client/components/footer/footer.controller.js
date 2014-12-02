'use strict';

angular.module('zesty')
  .controller('FooterCtrl', ['$scope', function ($scope) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Deals',
      'link': '/deals'
    },{
      'title': 'New',
      'link': '/new'
    }];
  }]);
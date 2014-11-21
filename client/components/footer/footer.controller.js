'use strict';

angular.module('fullApp')
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
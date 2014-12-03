'use strict';

angular.module('zesty')
  .directive('addressForm', ['FileServ', function (FileServ) {
    return {
      templateUrl: 'app/directives/address/address.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        FileServ.readFile('../../../assets/conf/country.json').then(
          function(data){
            scope.countries = data;
          }
        );
      }
    };
  }]);
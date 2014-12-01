'use strict';

angular.module('fullApp')
  .directive('reviewProgressBars', function () {
    return {
      templateUrl: 'app/directives/reviewProgressBars/reviewProgressBars.html',
      restrict: 'E',
      link: function (scope) {
        scope.maxVal = 10;

        scope.oneVal = 4;
        scope.oneValPercentage = (scope.oneVal * 100) / scope.maxVal;

        scope.twoVal = 2;
        scope.twoValPercentage = (scope.twoVal * 100) / scope.maxVal;

        scope.threeVal = 5;
        scope.threeValPercentage = (scope.threeVal * 100) / scope.maxVal;
        
        scope.fourVal = 8;
        scope.fourValPercentage = (scope.fourVal * 100) / scope.maxVal;

        scope.fiveVal = 6;
        scope.fiveValPercentage = (scope.fiveVal * 100) / scope.maxVal;
      }
    };
  });
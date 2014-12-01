'use strict';

angular.module('fullApp')
  .directive('reviewProgressBars', function () {
    return {
      templateUrl: 'app/directives/reviewProgressBars/reviewProgressBars.html',
      restrict: 'E',
      link: function (scope) {
        scope.oneVal = 4;
        scope.twoVal = 2;
        scope.threeVal = 5;
        scope.fourVal = 8;
        scope.fiveVal = 6;

        var maxValue = _.max([scope.oneVal, scope.twoVal, scope.threeVal, scope.fourVal, scope.fiveVal]);
        var maxCounter = parseInt(maxValue / 10, 10);
        var maxRemainCounter = maxValue % 10;
        if (maxRemainCounter > 0) {
          maxCounter++;
        } else if (maxRemainCounter === 0) {
          maxCounter = maxCounter + 0.5;
        }
        scope.maxVal = maxCounter * 10;

        scope.oneValPercentage = (scope.oneVal * 100) / scope.maxVal;
        scope.twoValPercentage = (scope.twoVal * 100) / scope.maxVal;
        scope.threeValPercentage = (scope.threeVal * 100) / scope.maxVal;
        scope.fourValPercentage = (scope.fourVal * 100) / scope.maxVal;
        scope.fiveValPercentage = (scope.fiveVal * 100) / scope.maxVal;
      }
    };
  });
'use strict';

angular.module('zesty')
  .directive('reviewProgressBars', function () {
    var ReviewBar = {
      draw: function (scope) {
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
    return {
      templateUrl: 'app/directives/reviewProgressBars/reviewProgressBars.html',
      restrict: 'E',
      scope: true,
      link: function (scope, elem, attrs) {
        scope.oneVal = parseInt(attrs.first, 10) || 0;
        scope.twoVal = parseInt(attrs.two, 10) || 0;
        scope.threeVal = parseInt(attrs.three, 10) || 0;
        scope.fourVal = parseInt(attrs.four, 10) || 0;
        scope.fiveVal = parseInt(attrs.five, 10) || 0;

        scope.$watch('first', function(newVal) {
          scope.oneVal = parseInt(newVal, 10) || 0;
          ReviewBar.draw(scope);
        });
        scope.$watch('two', function(newVal) {
          scope.twoVal = parseInt(newVal, 10) || 0;
          ReviewBar.draw(scope);
        });
        scope.$watch('three', function(newVal) {
          scope.threeVal = parseInt(newVal, 10) || 0;
          ReviewBar.draw(scope);
        });
        scope.$watch('four', function(newVal) {
          scope.fourVal = parseInt(newVal, 10) || 0;
          ReviewBar.draw(scope);
        });
        scope.$watch('five', function(newVal) {
          scope.fiveVal = parseInt(newVal, 10) || 0;
          ReviewBar.draw(scope);
        });
        ReviewBar.draw(scope);
      }
    };
  });
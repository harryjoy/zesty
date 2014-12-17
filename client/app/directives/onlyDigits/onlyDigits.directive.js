'use strict';

angular.module('zesty')
  .directive('onlyDigits', function () {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope:{
        allowDecimal: '@',
        allowNegative: '@',
        minNum: '@',
        maxNum: '@'
      },
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel){ return; }
        ngModel.$parsers.unshift(function (inputValue) {
          var decimalFound = false;
          var strInputValue = inputValue + '';
          var digits = strInputValue.split('').filter(function (char, i) {
            var b = (!isNaN(char) && char !== ' ');
            if (!b && attrs.allowDecimal && attrs.allowDecimal === 'true') {
              if (char === '.' && decimalFound === false) {
                decimalFound = true;
                b = true;
              }
            }
            if (!b && attrs.allowNegative && attrs.allowNegative === 'true') {
              b = (char === '-' && i === 0);
            }
            return b;
          }).join('');
          if (attrs.maxNum && !isNaN(attrs.maxNum) && parseFloat(digits) > parseFloat(attrs.maxNum)) {
            digits = attrs.maxNum;
          }
          if (attrs.minNum && !isNaN(attrs.minNum) && parseFloat(digits) < parseFloat(attrs.minNum)) {
            digits = attrs.minNum;
          }
          ngModel.$viewValue = parseFloat(digits);
          ngModel.$render();
          return parseFloat(digits);
        });
      }
    };
  });
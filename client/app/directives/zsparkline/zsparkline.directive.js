'use strict';

angular.module('zesty.charts')
  .directive('zspark', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var opts={};

      opts.type = attrs.type || 'line'; //TODO: Use $eval to get the object
      opts.barColor = attrs.barColor || '#ffffff';
      opts.height = attrs.height || '35px';
      opts.width = attrs.width || '35px';
      opts.barWidth = attrs.barWidth || '5px';
      opts.barSpacing = attrs.barSpacing || '2px';
      opts.zeroAxis = attrs.zeroAxis || 'false';

      scope.$watch(attrs.ngModel, function () { render(); }, true);
      scope.$watch(attrs.opts, function() { render(); }, true);
      var render = function () {
        var model;
        if(attrs.opts) {
          angular.extend(opts, angular.fromJson(attrs.opts));
        }
        if (angular.isString(ngModel.$viewValue)) { // Trim trailing comma if we are a string
          model = ngModel.$viewValue.replace(/(^,)|(,$)/g, '');
        } else {
          model = ngModel.$viewValue;
        }
        var data;
        if (angular.isArray(model)) { // Make sure we have an array of numbers
          data = model;
        } else {
          if (model) { data = model.split(','); }
          else { data = []; }
        }
        $(elem).sparkline(data, opts);
      };
    }
  };
});
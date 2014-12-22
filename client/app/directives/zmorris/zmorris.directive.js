'use strict';

angular.module('zesty.charts')
  .directive('zmorrisBar', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var morris, opts = {
        element: elem,
        xLabelMargin: 2,
        hideHover: true,
        axes: false,
        grid: false,
        resize: true
      };

      // The name of the data record attribute that contains x-values.
      if (attrs.xkey === void 0 || attrs.xkey === '') {
        opts.xkey = 'year';
      } else {
        opts.xkey = attrs.xkey;
      }

      // A list of names of data record attributes that contain y-values.
      var ykeys;
      if (angular.isArray(attrs.ykeys)) { // Make sure we have an array of numbers
        ykeys = attrs.ykeys;
      } else {
        if (attrs.ykeys) { ykeys = attrs.ykeys.split(','); }
        else { ykeys = []; }
      }
      opts.ykeys = ykeys;

      // Labels for the ykeys -- will be displayed when you hover over the chart.
      var labels;
      if (angular.isArray(attrs.labels)) { // Make sure we have an array of numbers
        labels = attrs.labels;
      } else {
        if (attrs.labels) { labels = attrs.labels.split(','); }
        else { labels = []; }
      }
      opts.labels = labels;

      scope.$watch(attrs.ngModel, function () { render(); }, true);
      var render = function() {
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
        opts.data = data;
        if(!morris) {
          morris = new Morris.Bar(opts);
        } else {
          morris.setData(data);
        }
      };
    }
  };
}).directive('zmorrisDonut', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var morris, opts = {
        element: elem,
        resize: true
      };
      scope.$watch(attrs.ngModel, function () { render(); }, true);
      var render = function() {
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
        opts.data = data;
        if(!morris) {
          morris = new Morris.Donut(opts);
        } else {
          morris.setData(data);
        }
      };
    }
  };
}).directive('zmorrisLine', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {
      var morris, opts = {
        element: elem,
        hideHover: true,
        axes: false,
        gridEnabled: false,
        gridLineColor: 'transparent',
        resize: true,
        pointFillColors: 'rgba(255, 255, 255, 0)'
      };

      // The name of the data record attribute that contains x-values.
      if (attrs.xkey === void 0 || attrs.xkey === '') {
        opts.xkey = 'year';
      } else {
        opts.xkey = attrs.xkey;
      }

      // A list of names of data record attributes that contain y-values.
      var ykeys;
      if (angular.isArray(attrs.ykeys)) { // Make sure we have an array
        ykeys = attrs.ykeys;
      } else {
        if (attrs.ykeys) { ykeys = attrs.ykeys.split(','); }
        else { ykeys = []; }
      }
      opts.ykeys = ykeys;

      // Labels for the ykeys -- will be displayed when you hover over the chart.
      var labels;
      if (angular.isArray(attrs.labels)) { // Make sure we have an array of numbers
        labels = attrs.labels;
      } else {
        if (attrs.labels) { labels = attrs.labels.split(','); }
        else { labels = []; }
      }
      opts.labels = labels;

      if (attrs.lineColors === void 0 || attrs.lineColors === '') {
        opts.lineColors = ['#0b62a4', '#0073b7'];
      } else {
        opts.lineColors = JSON.parse(attrs.lineColors);
      }
      if (attrs.isArea) {
        opts.lineWidth = 0;
        opts.pointSize = 0;
        opts.behaveLikeLine = true;
      }

      scope.$watch(attrs.ngModel, function () { render(); }, true);
      var render = function() {
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
        opts.data = data;
        if(!morris) {
          if (attrs.isArea) {
            morris = new Morris.Area(opts);
          } else {
            morris = new Morris.Line(opts);
          }
        } else {
          morris.setData(data);
        }
      };
    }
  };
});
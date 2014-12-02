'use strict';

angular.module('zesty')
  .directive('zdialog', function () {
    return {
      templateUrl: 'app/directives/zdialog/zdialog.html',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: true,
      link: function (scope, element, attrs) {
        scope.title = attrs.title;
        scope.showModalHeader = attrs.header;
        scope.extraClassForContent = attrs.contentclass;

        scope.$watch(attrs.visible, function(value) {
          if(value === true) {
            $(element).modal('show');
          } else {
            $(element).modal('hide');
          }
        });

        $(element).on('shown.bs.modal', function() {
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function() {
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
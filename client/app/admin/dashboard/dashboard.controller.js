'use strict';

angular.module('zesty.admin')
  .controller('AdminDashboardCtrl', ['$scope', '$timeout',
  function ($scope, $timeout) {

  $scope.orderCounts = [20, 10, 5, 20, 40, 57, 42, 18, 5, 20, 10, 5, 24, 32, 15, 20,
    10, 5, 20, 10, 5, 20, 10, 5, 20, 40, 65, 24, 32, 75];

  $scope.areaData = [
    { y: '2006', a: 100, b: 90 },
    { y: '2007', a: 34,  b: 24 },
    { y: '2008', a: 89,  b: 79 },
    { y: '2009', a: 56,  b: 46 },
    { y: '2010', a: 150,  b: 140 },
    { y: '2011', a: 23,  b: 13 },
    { y: '2012', a: 75, b: 65 }
  ];

  $scope.lineOpts = {
    width: '100%',
    spotRadius: 3,
    lineWidth:1,
    lineColor:'rgba(255,255,255,.9)',
    fillColor: 'rgba(0,0,0,0.05)',
    spotColor: 'rgba(255,255,255, 0)',
    minSpotColor: 'rgba(255,255,255,.5)',
    maxSpotColor: 'rgba(255,255,255,.5)',
    highlightLineColor : '#ffffff',
    highlightSpotColor: '#ffffff'
  };

  $scope.donutOpts = {
    type: 'pie',
    width: '100',
    height: '100',
    tooltipFormat: '{{offset}} ({{percent.1}}%)',
    // tooltipFormat: '{{offset:offset}} ({{percent.1}}%)',
    tooltipValueLookups: {
      'offset': {
        0: 'Category 1',
        1: 'Category'
      }
    },
    sliceColors: ['#fe7211','#7ad689','#128376', '#ddd', '#649614',
    '#FFF', '#F012BE', '#FF851B', '#01FF70', '#3D9970', '#39CCCC']
  };

  $scope.overvierLoading = false;
  $scope.refreshOverview = function() {
    $scope.overvierLoading = true;
    $timeout(function() {
      $scope.overvierLoading = false;
    }, 2500);
  };
}]);


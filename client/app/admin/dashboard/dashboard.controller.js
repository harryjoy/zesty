'use strict';

angular.module('zesty.admin')
  .controller('AdminDashboardCtrl', ['$scope',
  function ($scope) {

  $scope.orderCounts = [20, 10, 5, 20, 40, 57, 42, 18, 5, 20, 10, 5, 24, 32, 15, 20, 10, 5, 20, 10, 5, 20, 10, 5, 20, 10, 5, 24, 32, 15];
  
  $scope.data = [
    { year: '2008', value: 20 },
    { year: '2009', value: 10 },
    { year: '2010', value: 5 },
    { year: '2011', value: 5 },
    { year: '2012', value: 20 }
  ];
  $scope.sales = [
    { label: '2008', value: 20 },
    { label: '2009', value: 10 },
    { label: '2010', value: 5 },
    { label: '2011', value: 5 },
    { label: '2012', value: 20 }
  ];

  $scope.areaData = [
    { y: '2006', a: 100, b: 90 },
    { y: '2007', a: 75,  b: 65 },
    { y: '2008', a: 50,  b: 40 },
    { y: '2009', a: 75,  b: 65 },
    { y: '2010', a: 50,  b: 40 },
    { y: '2011', a: 75,  b: 65 },
    { y: '2012', a: 100, b: 90 }
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
    sliceColors: ['#2d4859','#fe7211','#7ad689','#128376', '#ddd', '#649614',
    '#FFF', '#F012BE', '#FF851B', '#01FF70', '#3D9970', '#39CCCC', '#001F3F',
    '#0073b7']
  };
}]);


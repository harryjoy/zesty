'use strict';

angular.module('zesty.lodash', [])
  .service('_', [function () {
    return window._; // assumes underscore or lodash has already been loaded on the page
  }]);

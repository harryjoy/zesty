'use strict';

/*
 * This is used to cache product review and do not make request 
 * for pages that has already been visited.
 */
angular.module('zesty')
  .service('PaginationServ', ['$scope', function ($scope) {
  return {
    pageData: {},
    addNewPage: function (service, dataHolder) {
      var self = this;
      service.$promise.then(function(resultData) {
        if (resultData && resultData.length > 0) {
          self.pageData[$scope.currentPage] = resultData;
          dataHolder = resultData;
        }
      });
    },
    getPageData: function (dataHolder) {
      if (this.pageData[$scope.currentPage] && this.pageData[$scope.currentPage].length > 0) {
        dataHolder = this.pageData[$scope.currentPage];
      } else {
        this.addNewPage();
      }
    },
    setPageData: function (resultData) {
      this.pageData[$scope.currentPage] = resultData;
    }
  };
}]);

'use strict';

/*
 * This is used to cache pagination results and do not make request 
 * for pages that has already been visited.
 */
angular.module('zesty')
  .service('PaginationServ', [function () {
  return {
    pageData: {},
    getPageData: function (index) {
      if (this.pageData[index] && this.pageData[index].length > 0) {
        return this.pageData[index];
      }
      return null;
    },
    setPageData: function (index, resultData) {
      this.pageData[index] = resultData;
    },
    refreshData: function () {
      this.pageData = {};
    }
  };
}]);

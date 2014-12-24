'use strict';
/**
 * image-uploader
 * 
 */
angular.module('zesty')
.directive('imageUploader', ['FileServ', '$timeout', 'FileUploader', function (FileServ, $timeout, FileUploader) {
  return {
    templateUrl: 'app/directives/imageUploader/imageUploader.html',
    restrict: 'E',
    link: function (scope) {
      scope.selection = 3;
      scope.icons = scope.images = [];
      scope.media = {};
      scope.loadFileList = function() {
        // get images from public folder.
        FileServ.getImageList().then(function(data) {
          scope.images = data;
        });
      };
      // file uploader instance
      var uploader = scope.uploader = new FileUploader({
        url: '/api/upload',
        autoUpload: true
      });
      $timeout(function () {
        // filter for image only.
        uploader.filters.push({
          name: 'imageFilter',
          fn: function(item /*{File|FileLikeObject}*/) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        });

        // uploader callbacks
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
          console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
          console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
          console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
          scope.loadFileList();
        };

        // to clear value of file dialog after file selection.
        FileUploader.FileSelect.prototype.isEmptyAfterSelection = function() {
          return true;
        };

        // read icons from extenal config file.
        FileServ.readFile('../../../assets/conf/category-icons.json').then(function(data){
          scope.icons = data;
        });
        scope.loadFileList();
      }, 0);
    }
  };
}]);

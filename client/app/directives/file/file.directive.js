'use strict';

angular.module('zesty')
  .directive('zfile', function () {
    /**
     * Get File extension based on its name.
     * @param  {String} fileName the actual file name.
     * @return {String}          Extension based on file name.
     */
    function getFileExtension(fileName) {
      var a = fileName.split('.');
      if(a.length === 1 || (a[0] === '' && a.length === 2)) {
        return '';
      }
      return a.pop().toLowerCase();
    }

    return {
      templateUrl: 'app/directives/file/file.html',
      restrict: 'E',
      scope: true,
      link: function (scope) {
        scope.ext = '';
        var fileType = getFileExtension(scope.file);
        if (fileType === 'doc' || fileType === 'docx' || fileType === 'rtf') { // word files
          scope.ext = 'word-';
        } else if (fileType === 'zip' || fileType === 'rar' || fileType === 'war' ||
          fileType === '7zip' || fileType === 'gzip' || fileType === 'tgz') { // zip files
          scope.ext = 'archive-';
        } else if (fileType === 'png' || fileType === 'gif' || fileType === 'jpeg' ||
          fileType === 'jpg') { // image files
          scope.ext = 'image-';
        } else if (fileType === 'mp3' || fileType === 'avi' || fileType === 'aa3') { // music files
          scope.ext = 'sound-';
        } else if (fileType === 'json' || fileType === 'js' || fileType === 'java' ||
          fileType === 'net' || fileType === 'c' || fileType === 'cpp' ||
          fileType === 'css' || fileType === 'scss' || fileType === 'less' ||
          fileType === 'class' || fileType === 'app') { // code files
          scope.ext = 'code-';
        } else if (fileType === 'xls' || fileType === 'xlsx') { // excel files
          scope.ext = 'excel-';
        } else if (fileType === 'mp4' || fileType === 'mpeg') { // movie/video files
          scope.ext = 'movie-';
        } else if (fileType === 'pdf') { // pdf
          scope.ext = 'pdf-';
        } else if (fileType === 'ppt' || fileType === 'pptx') { // powerpoint files
          scope.ext = 'powerpoint-';
        } else if (fileType === 'txt' || fileType === 'text') { // text files
          scope.ext = 'text-';
        }
      }
    };
  });
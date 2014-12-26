'use strict';

angular.module('zesty')
  .factory('Uploader', ['$rootScope', '$modal', 'FileServ', 'FileUploader', 'AlertServ',
    function ($rootScope, $modal, FileServ, FileUploader, AlertServ) {

  var selection = 3, image, icon;

  /**
   * Get images from public folder.
   * @param  {[type]} modalScope The Modal Scope
   */
  function loadFileList(modalScope) {
    FileServ.getImageList().then(function(data) {
      modalScope.images = data;
      console.log(modalScope.hiddenData);
      if (modalScope.hiddenData && modalScope.hiddenData.images && modalScope.hiddenData.images.length > 0) {
        _.forEach(modalScope.hiddenData.images, function(img) {
          _.pull(modalScope.images, img);
        });
      }
    });
  }

  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $modal.open() returns
   */
  function openModal(scope, modalClass) {
    var modalScope = $rootScope.$new();
    scope = scope || {};
    modalClass = modalClass || 'modal-default';

    angular.extend(modalScope, scope);

    modalScope.icons = modalScope.images = [];
    modalScope.media = {};
    modalScope.selection = 3;

    // file uploader instance
    var uploader = modalScope.uploader = new FileUploader({
      url: '/api/upload',
      autoUpload: true
    });

    modalScope.updateSelection = function(select) {
      modalScope.selection = select;
      selection = select;
    };

    loadFileList(modalScope);

    // filter for image only.
    uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // uploading done listener.
    uploader.onCompleteAll = function() {
      loadFileList(modalScope);
    };

    // to clear value of file dialog after file selection.
    FileUploader.FileSelect.prototype.isEmptyAfterSelection = function() {
      return true;
    };

    // read icons from extenal config file.
    FileServ.readFile('../../assets/conf/category-icons.json').then(function(data) {
      modalScope.icons = data;
      if (modalScope.hiddenData && modalScope.hiddenData.icons && modalScope.hiddenData.icons.length > 0) {
        _.forEach(modalScope.hiddenData.icons, function(img) {
          _.pull(modalScope.icons, img);
        });
      }
    });

    modalScope.$watch('media.image', function(value) {
      if (value && value !== '') {
        image = value;
      }
    });
    modalScope.$watch('media.icon', function(value) {
      if (value && value !== '') {
        icon = value;
      }
    });

    return $modal.open({
      templateUrl: 'components/uploader/uploader.html',
      windowClass: modalClass,
      scope: modalScope,
      size: 'lg'
    });
  }

  /**
   * Get selected image or icon.
   * @return {String} selected item, icon class or image name.
   */
  function getSelectedValue() {
    var selectedImage;
    if (selection === 2) {
      selectedImage = icon;
    } else if (selection === 3) {
      selectedImage = image;
    }
    return selectedImage;
  }

  // Public API here
  return {
    /**
     * Create a function to open a image selection dialog.
     * @param {Boolean} icon Whether to provide option for selecting icons or not.
     * @param {Boolean} multiple Whether multiple selecion is allowed or not.
     * @param {Object} data Already selected data. 
     *        format for data: {icons: ['fa-check', 'fa-male'], images: ['abc.png', 'xyz.png']}
     * @param  {Function} cb - callback, ran when image is selected.
     * @return {Function}    - the function to open the modal.
     */
    openImageSelector: function(icon, multiple, data, cb) {
      cb = cb || angular.noop;

      /**
       * Open a delete confirmation modal
       * @param  {All}  - any additional args are passed staight to cb callback
       */
      return function() {
        var args = Array.prototype.slice.call(arguments),
            deleteModal;

        deleteModal = openModal({
          isIcon: icon,
          isMultiple: multiple,
          hiddenData: data,
          modal: {
            dismissable: true,
            title: 'Media Library (Images)',
            buttons: [{
              classes: 'btn-success',
              text: 'Select',
              click: function(e) {
                var selected = getSelectedValue();
                if (!selected || selected === '') {
                  AlertServ.alert('Please select image' + (icon ? ' or icon' : '') + '.');
                } else {
                  deleteModal.close(e);
                }
              }
            }, {
              classes: 'btn-default',
              text: 'Cancel',
              click: function(e) {
                deleteModal.dismiss(e);
              }
            }]
          }
        });

        deleteModal.result.then(function(event) {
          args.push(getSelectedValue());
          args.push(selection);
          cb.apply(event, args);
        });
      };
    }
  };
}]);

'use strict';

angular.module('zesty')
  .factory('Modal', function ($rootScope, $modal) {
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

    return $modal.open({
      templateUrl: 'components/modal/modal.html',
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      delete: function(del) {
        var self = this;
        return function() {
          var args = Array.prototype.slice.call(arguments), name = args.shift();
          self.openModalDialog(del, 'Confirm Delete',
            '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
            'Delete', 'btn-danger', 'modal-danger', args)();
        };
      },

      /**
       * Create a function to open a recover confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when recover is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      recover: function(del) {
        var self = this;
        return function() {
          var args = Array.prototype.slice.call(arguments), name = args.shift();
          self.openModalDialog(del, 'Confirm Recovery',
            '<p>Are you sure you want to recover <strong>' + name + '</strong> ?</p>',
            'Recover', 'btn-primary', 'modal-warning', args)();
        };
      },

      /**
       * Create a function to open a publish confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when publish is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      publish: function(del) {
        var self = this;
        return function() {
          var args = Array.prototype.slice.call(arguments), name = args.shift();
          self.openModalDialog(del, 'Confirm Publish',
            '<p>Are you sure you want to publish <strong>' + name + '</strong> ?</p>',
            'Publish', 'btn-primary', 'modal-info', args)();
        };
      },

      openModalDialog: function(del, modalTitle, modalHtml, successBtnText, successBtnClass, modalClass, args) {
        del = del || angular.noop;

        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed staight to del callback
         */
        return function() {
          var deleteModal = openModal({
            modal: {
              dismissable: true,
              title: modalTitle,
              html: modalHtml,
              buttons: [{
                classes: successBtnClass,
                text: successBtnText,
                click: function(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, modalClass);

          deleteModal.result.then(function(event) {
            del.apply(event, args);
          });
        };
      }
    }
  };
});

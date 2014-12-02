'use strict';

angular.module('fullApp')
  .controller('ProfileCtrl', ['$scope', '$modal', 'Modal', function ($scope, $modal, Modal) {
    $scope.user = {
      firstName: 'Harsh',
      lastName: 'Raval',
      company: 'Zymr Inc',
      email: 'harsh@zymr.com',
      newsletter: true,
      addresses: [{
        title: 'Home address',
        firstName: 'Harry',
        lastName: 'Joy',
        email: 'harry@joy.com',
        mobile: '(+91) 999-xx-xxx-59',
        addressLine1: 'E-603, Vandemataram Icon',
        addressLine2: 'Near Vandemataram Cross Road, Gota',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        zipcode: '382461',
        isDefault: true
      },{
        title: 'Company address',
        firstName: 'Harsh',
        lastName: 'Raval',
        email: 'harsh@zymr.com',
        mobile: '(+91) 999-xx-xxx-59',
        addressLine1: 'A/5, 2nd Floor, Safal Profitier',
        addressLine2: 'Corporate Road, Nr. Prahladnagar Garden',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        zipcode: '380015',
        isDefault: false
      }]
    };

    $scope.openAddAddressDialog = function () {
      var modalInstance = $modal.open({
        templateUrl: 'addAddressPopup',
        controller: 'AddressPopupCtrl',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          address: function () {
            return {};
          },
          title: function () {
            return 'Add new address';
          }
        }
      });
      modalInstance.result.then(function (address) {
        console.log('Save address:', address);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openEditAddressDialog = function (addressToEdit) {
      var modalInstance = $modal.open({
        templateUrl: 'addAddressPopup',
        controller: 'AddressPopupCtrl',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          address: function () {
            return addressToEdit;
          },
          title: function () {
            return 'Edit: ' + addressToEdit.title;
          }
        }
      });
      modalInstance.result.then(function (address) {
        console.log('Edit address:', address);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    // Modal.confirm.delete returns a function that will open a modal when ran
    // We use closure to define the callback for the modal's confirm action here in the controller
    $scope.deleteAddress = Modal.confirm.delete(function() { // callback when modal is confirmed
      console.log('confirmed... remove this item from address.');
    });

    //Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();

    /*     
     * Add collapse and remove events to boxes
     */
    $('[data-widget="collapse"]').click(function() {
      //Find the box parent        
      var box = $(this).parents('.box').first();
      //Find the body and the footer
      var bf = box.find('.box-body, .box-footer');
      if (!box.hasClass('collapsed-box')) {
        box.addClass('collapsed-box');
        bf.slideUp();
      } else {
        box.removeClass('collapsed-box');
        bf.slideDown();
      }
    });

  }]);
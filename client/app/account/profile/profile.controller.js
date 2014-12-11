'use strict';

angular.module('zesty')
  .controller('ProfileCtrl', ['$scope', '$modal', 'Modal', 'Auth', 'User',
    function ($scope, $modal, Modal, Auth, User) {

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
        address.isDefault = false;
        User.addAddress({id: $scope.user._id}, address).$promise.then(function (user) {
          Auth.setCurrentUser(user);
        }).catch(function (err) {
          console.log(err);
          window.alert('Error while adding address, please try again later.');
        });
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
        User.editAddress({id: $scope.user._id}, address).$promise.then(function (user) {
          Auth.setCurrentUser(user);
        }).catch(function (err) {
          console.log(err);
          window.alert('Error while editing address, please try again later.');
        });
      });
    };

    $scope.makeAddressDefault = function (addressId) {
      User.makeAddressDefault({id: $scope.user._id, childId: addressId}).$promise.then(function (user) {
        Auth.setCurrentUser(user);
      }).catch(function (err) {
        console.log(err);
        window.alert('Error while making address default, please try again later.');
      });
    };
    
    $scope.errors = {};
    $scope.profileLoader = false;
    $scope.emailLoader = false;
    $scope.notificationLoader = false;

    // update user profile fields: [firstName, lastName, mobile, landline, gender].
    $scope.updateProfile = function(form) {
      $scope.profileSubmitted = true;
      if(form.$valid) {
        $scope.profileLoader = true;
        User.update({id: $scope.user._id}, {
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          mobile: $scope.user.mobile,
          landline: $scope.user.landline,
          gender: $scope.user.gender
        }).$promise.then(function (user) {
          Auth.setCurrentUser(user);
          $scope.profileLoader = false;
        }).catch(function (err) {
          console.log(err);
          $scope.errors.profile = 'Error while updating profile, please try again later.';
          $scope.profileLoader = false;
        });
      }
    };
    // update user email id.
    $scope.updateEmail = function(form) {
      $scope.emailSubmitted = true;
      if(form.$valid) {
        $scope.emailLoader = true;
        User.update({id: $scope.user._id}, {
          email: $scope.user.email
        }).$promise.then(function (user) {
          Auth.setCurrentUser(user);
          $scope.emailLoader = false;
        }).catch(function (err) {
          console.log(err);
          $scope.errors.email = 'Error while updating email id, please try again later.';
          $scope.emailLoader = false;
        });
      }
    };
    // update user notification settings.
    $scope.updateNotifications = function(form) {
      $scope.notificationSubmitted = true;
      if(form.$valid) {
        $scope.notificationLoader = true;
        User.update({id: $scope.user._id}, {
          newsletter: $scope.user.newsletter,
          specialOffers: $scope.user.specialOffers
        }).$promise.then(function (user) {
          Auth.setCurrentUser(user);
          $scope.notificationLoader = false;
        }).catch(function (err) {
          console.log(err);
          $scope.errors.notifications = 'Error while updating notification settings, please try again later.';
          $scope.notificationLoader = false;
        });
      }
    };

    // Modal.confirm.delete returns a function that will open a modal when ran
    // We use closure to define the callback for the modal's confirm action here in the controller
    $scope.deleteAddress = Modal.confirm.delete(function(addressId) { // callback when modal is confirmed
      User.deleteAddress({id: $scope.user._id, childId: addressId}).$promise.then(function (user){
        Auth.setCurrentUser(user);
      }).catch(function (err) {
        console.log(err);
        window.alert('Error while deleting address, please try again later.');
      });
    });

    //Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();

    /*     
     * Add collapse and remove events to cards
     */
    $('[data-widget="collapse"]').click(function() {
      //Find the card parent        
      var card = $(this).parents('.card').first();
      //Find the body and the footer
      var bf = card.find('.card-body, .card-footer');
      if (!card.hasClass('collapsed-card')) {
        card.addClass('collapsed-card');
        bf.slideUp();
      } else {
        card.removeClass('collapsed-card');
        bf.slideDown();
      }
    });

  }]);
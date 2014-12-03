'use strict';

angular.module('zesty')
  .controller('ShippingCtrl', ['$scope',
    function ($scope) {

  $scope.addresses = [{
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
  }];

  $scope.showNewAddressForm = false;
}]);

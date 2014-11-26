'use strict';

angular.module('fullApp')
  .controller('ProfileCtrl', function ($scope) {
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
  });

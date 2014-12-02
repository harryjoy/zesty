'use strict';

angular.module('zesty')
  .controller('InvoiceCtrl', ['$scope',
      function ($scope) {
    $scope.order = {
      from: {
        name: 'Zesty',
        addressLine1: 'E-603 Vandemataram Icon',
        addressLine2: 'Near Vandemataram Cross Road, Gota',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        zipcode: '380015',
        phone: 'XXX-XX-XXXX',
        email: 'info@zesty.com'
      },
      to: {
        name: 'Test User',
        addressLine1: 'Near Gitabhavan',
        addressLine2: 'Pubilc Park Area',
        city: 'Himatnagar',
        state: 'Gujarat',
        country: 'India',
        zipcode: '380015',
        phone: 'XXX-XX-XXXX',
        email: 'test@test.com'
      },
      invoiceNumber: '12345',
      id: '4f7h8u',
      date: '2/21/2014',
      paymentDate: '2/21/2014',
      paymentMethod: 'cc-visa',
      items: [{
        name: 'Calls for me',
        description: 'This indicates how many calls are there for me.',
        price: 300,
        qty: 1,
        priceUnit: 'Rs.'
      },{
        name: 'Mister India',
        description: 'A beatiful movie of bollywood.',
        price: 234,
        qty: 2,
        priceUnit: 'Rs.'
      },{
        name: 'Men In Black',
        description: 'Alien movie from hollywood.',
        price: 120,
        qty: 1,
        priceUnit: 'Rs.'
      },{
        name: 'Be yar',
        description: 'Great gujarati comedy movie.',
        price: 456,
        qty: 3,
        priceUnit: 'Rs.'
      }],
      offers: [{
        name: '10% Off',
        description: 'Buy any goods and get 10% off.'
      }],
      coupons: [{
        code: 'XYZ-ABC-QWERTY',
        description: 'Code for getting 15% off on final price.'
      }],
      subtotal: 250,
      tax: 12.5,
      shipping: 0,
      priceUnit: 'Rs.'
    };
  }]);

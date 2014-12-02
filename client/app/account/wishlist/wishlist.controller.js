'use strict';

angular.module('zesty')
  .controller('WishlistCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'Modal',
      function ($scope, DTOptionsBuilder, DTColumnDefBuilder, Modal) {
    $scope.dtOptions = DTOptionsBuilder.newOptions().withBootstrap()
      .withOption('info', false).withOption('order', [0, 'asc']);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
      ];
    $scope.items = [{
      id: 'E123',
      image: 'http://placehold.it/400x400',
      name: 'Item 1',
      price: 'Rs 649',
      description: 'this is product description. this is product description.'
    },{
      id: 'E135',
      image: 'http://placehold.it/400x400',
      name: 'Item 2',
      price: 'Rs 4545',
      description: 'this is product description. this is product description.'
    },{
      id: 'E12345',
      image: 'http://placehold.it/400x400',
      name: 'Item 3',
      price: 'Rs 234',
      description: 'this is product description. this is product description.'
    },{
      id: 'E6534',
      image: 'http://placehold.it/400x400',
      name: 'Item 4',
      price: 'Rs 134',
      description: 'this is product description. this is product description.'
    },{
      id: 'E2353',
      image: 'http://placehold.it/400x400',
      name: 'Item 5',
      price: 'Rs 1344',
      description: 'this is product description. this is product description.'
    }];

    // Modal.confirm.delete returns a function that will open a modal when ran
    // We use closure to define the callback for the modal's confirm action here in the controller
    $scope.delete = Modal.confirm.delete(function() { // callback when modal is confirmed
      console.log('confirmed... remove this item from wishlist.');
    });
  }]);

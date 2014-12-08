'use strict';

describe('Controller: ProductreviewsCtrl', function () {

  // load the controller's module
  beforeEach(module('zesty'));

  var ProductreviewsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductreviewsCtrl = $controller('ProductreviewsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

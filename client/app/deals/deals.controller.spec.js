'use strict';

describe('Controller: DealsCtrl', function () {

  // load the controller's module
  beforeEach(module('zesty'));

  var DealsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DealsCtrl = $controller('DealsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

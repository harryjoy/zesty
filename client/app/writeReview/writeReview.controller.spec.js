'use strict';

describe('Controller: WritereviewCtrl', function () {

  // load the controller's module
  beforeEach(module('fullApp'));

  var WritereviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WritereviewCtrl = $controller('WritereviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

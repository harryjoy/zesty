'use strict';

describe('Controller: AuthenticationCtrl', function () {

  // load the controller's module
  beforeEach(module('fullApp'));

  var AuthenticationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthenticationCtrl = $controller('AuthenticationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

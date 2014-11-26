'use strict';

describe('Directive: addressForm', function () {

  // load the directive's module and view
  beforeEach(module('fullApp'));
  beforeEach(module('app/directives/address/address.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<address-form></address-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the address-form directive');
  }));
});
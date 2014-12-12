'use strict';

describe('Directive: cartPopupItem', function () {

  // load the directive's module and view
  beforeEach(module('zesty'));
  beforeEach(module('app/directives/cartPopupItem/cartPopupItem.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cart-popup-item></cart-popup-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cartPopupItem directive');
  }));
});
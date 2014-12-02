'use strict';

describe('Directive: register', function () {

  // load the directive's module and view
  beforeEach(module('zesty'));
  beforeEach(module('app/directives/register/register.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<register></register>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the register directive');
  }));
});
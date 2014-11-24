'use strict';

describe('Directive: owlCarosel', function () {

  // load the directive's module and view
  beforeEach(module('fullApp'));
  beforeEach(module('app/directives/owlCarosel/owlCarosel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<owl-carosel></owl-carosel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the owlCarosel directive');
  }));
});
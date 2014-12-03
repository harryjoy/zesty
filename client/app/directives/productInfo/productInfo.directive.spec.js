'use strict';

describe('Directive: productInfo', function () {

  // load the directive's module and view
  beforeEach(module('zesty'));
  beforeEach(module('app/directives/productInfo/productInfo.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-info></product-info>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the productInfo directive');
  }));
});
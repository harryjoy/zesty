'use strict';

describe('Directive: orderSummary', function () {

  // load the directive's module and view
  beforeEach(module('fullApp'));
  beforeEach(module('app/directives/orderSummary/orderSummary.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<order-summary></order-summary>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the orderSummary directive');
  }));
});
'use strict';

describe('Directive: orderInvoice', function () {

  // load the directive's module and view
  beforeEach(module('fullApp'));
  beforeEach(module('app/directives/orderInvoice/orderInvoice.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<order-invoice></order-invoice>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the orderInvoice directive');
  }));
});
'use strict';

describe('Directive: zdialog', function () {

  // load the directive's module and view
  beforeEach(module('fullApp'));
  beforeEach(module('app/directives/zdialog/zdialog.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<zdialog></zdialog>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the zdialog directive');
  }));
});
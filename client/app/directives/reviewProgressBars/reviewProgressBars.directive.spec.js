'use strict';

describe('Directive: reviewProgressBars', function () {

  // load the directive's module and view
  beforeEach(module('zesty'));
  beforeEach(module('app/directives/reviewProgressBars/reviewProgressBars.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<review-progress-bars></review-progress-bars>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the reviewProgressBars directive');
  }));
});
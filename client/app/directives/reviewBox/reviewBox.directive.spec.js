'use strict';

describe('Directive: reviewBox', function () {

  // load the directive's module and view
  beforeEach(module('zesty'));
  beforeEach(module('app/directives/reviewBox/reviewBox.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<review-box></review-box>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the reviewBox directive');
  }));
});
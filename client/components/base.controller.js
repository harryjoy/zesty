'use strict';

angular.module('zesty')
  .controller('BaseCtrl', ['$scope', '$location', 'Auth', '$window',
    function ($scope, $location, Auth, $window) {

  $scope.moment = moment;
  $scope.dateFormate = 'MMMM Do YYYY';
  $scope.smDateFormate = 'MMM DD YYYY';
  $scope.minDateFormate = 'MM Do YY';
  
  $scope.appName = 'Zesty';
  $scope.siteName = 'Zesty';
  $scope.siteSeller = 'General Store';
  $scope.orderPrefix = 'ZST';
  $scope.orderFrom = {
    name: 'Zesty',
    addressLine1: 'Near SuperMan',
    addressLine2: 'Beside Batman and Robin, With Joker',
    city: 'Gotham',
    state: 'Funland',
    country: 'ExtraOrdinary',
    zipcode: 'EO-000-XXX',
    phone: 'XXX-XX-XXXX',
    email: 'info@zesty.com'
  };

  $scope.isLoggedInFunc = Auth.isLoggedIn;
  $scope.user = Auth.getCurrentUser();
  $scope.cart = Auth.getCurrentCart();
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.$on('user.updated', function() {
    $scope.user = Auth.getCurrentUser();
  });
  $scope.$on('login.success', function() {
    $scope.user = Auth.getCurrentUser();
    $scope.cart = Auth.getCurrentCart();
  });
  $scope.$on('logout.success', function() {
    $scope.user = {};
    $scope.cart = {};
  });
  $scope.$on('cart.updated', function() {
    $scope.cart = Auth.getCurrentCart();
  });

  /**
   * Check if current url is matching with passed route.
   * @param  {String}  route Path to check with current path.
   * @return {Boolean}       true if route is equal to current path.
   */
  $scope.isActive = function(route) {
    return route === $location.path();
  };

  /**
   * Check if current url is matching with passed route.
   * @param  {[String]}  routes Path to check with current path.
   * @return {Boolean}          true if any of route in routes is equal to current path.
   */
  $scope.isActiveMultiple = function(routes) {
    var match = false;
    var currentRoute = $location.path();
    $.each(routes, function (k, route) {
      if (-1 !== currentRoute.indexOf(route)) {
        match = true;
        return;
      }
    });
    return match;
  };

  /**
   * Get order numbe to be displayed on UI.
   * @param  {String} orderNumber Actual order number that is saved in db.
   * @return {String}             Order number to be displayed on UI.
   */
  $scope.getOrderDisplayNumber = function(orderNumber) {
    if (!orderNumber || orderNumber.indexOf('-') === -1) {
      return orderNumber;
    }
    return $scope.orderPrefix + '' + orderNumber.substring(orderNumber.lastIndexOf('-') + 1);
  };
  /**
   * Get order invoice numbe to be displayed on UI.
   * @param  {String} orderNumber Actual order number that is saved in db.
   * @return {String}             Order invoice number to be displayed on UI.
   */
  $scope.getOrderInvoiceNumber = function(orderNumber) {
    if (!orderNumber || orderNumber.indexOf('-') === -1) {
      return orderNumber;
    }
    return orderNumber.substring(orderNumber.lastIndexOf('-') + 1);
  };

  /**
   * Scroll page to top.
   */
  $scope.scrollToTop = function() {
    $window.scrollTo(0,0);
  };

}]);

'use strict';

angular.module('zesty')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: true,
        abstract: true
      })
      .state('admin.dashboard', {
        url: '',
        templateUrl: 'app/admin/dashboard/dashboard.html',
        controller: 'AdminDashboardCtrl',
        authenticate: true
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: 'app/admin/users/users.html',
        controller: 'AdminUsersCtrl',
        authenticate: true
      })
      .state('admin.products', {
        url: '/products',
        templateUrl: 'app/admin/items/items.html',
        controller: 'AdminItemsCtrl',
        authenticate: true
      })
      .state('admin.addProduct', {
        url: '/add-product',
        templateUrl: 'app/admin/addItem/addItem.html',
        controller: 'AdminAddItemsCtrl',
        authenticate: true
      })
      .state('admin.categories', {
        url: '/categories',
        templateUrl: 'app/admin/categories/categories.html',
        controller: 'AdminCategoriesCtrl',
        authenticate: true
      });
  });
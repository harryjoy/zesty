'use strict';

angular.module('zesty.admin', []);

angular.module('zesty', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'datatables',
  'reCAPTCHA',
  'ui.select2',
  'ImageZoom',
  'green.inputmask4angular',
  'zesty.utils',
  'zesty.admin'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, reCAPTCHAProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    // required: please use your own key :)
    reCAPTCHAProvider.setPublicKey('6Lfkk_4SAAAAACwIPxrbVf9od9nwmPBYSDmA2hra');
    // optional: gets passed into the Recaptcha.create call
    reCAPTCHAProvider.setOptions({
      theme: 'clean'
    });
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(['$rootScope', '$location', '$window', 'Auth', function ($rootScope, $location, $window, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
      $window.scrollTo(0,0);
    });
  }]);
'use strict';

angular.module('zesty')
  .factory('Auth', ['$location', '$rootScope', '$http', 'User', '$cookieStore', '$q', 'CartServ',
    function Auth($location, $rootScope, $http, User, $cookieStore, $q, CartServ) {
  var currentUser = {};
  var cart = {};
  if($cookieStore.get('token')) {
    currentUser = User.get({}, function (currentUser) {
      cart = User.myCart({
        id: currentUser._id
      }).$promise.then(function(updatedCart) {
        cart = updatedCart;
        $rootScope.$broadcast('cart.updated');
      });
    });
  }

  return {

    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    login: function(user, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      }).
      success(function(data) {
        $cookieStore.put('token', data.token);
        currentUser = User.get({}, function (currentUser) {
          cart = User.myCart({
            id: currentUser._id
          }).$promise.then(function(updatedCart) {
            cart = updatedCart;
            $rootScope.$broadcast('cart.updated');
          });
        });
        deferred.resolve(data);
        return cb();
      }).
      error(function(err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    },

    /**
     * Delete access token and user info
     *
     * @param  {Function}
     */
    logout: function() {
      $cookieStore.remove('token');
      currentUser = {};
      cart = {};
      $rootScope.$broadcast('logout.success');
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    createUser: function(user, callback) {
      var cb = callback || angular.noop;

      return User.save(user,
        function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          return cb(user);
        },
        function(err) {
          this.logout();
          return cb(err);
        }.bind(this)).$promise;
    },

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - optional
     * @return {Promise}
     */
    changePassword: function(oldPassword, newPassword, callback) {
      var cb = callback || angular.noop;

      return User.changePassword({ id: currentUser._id }, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(user) {
        return cb(user);
      }, function(err) {
        return cb(err);
      }).$promise;
    },

    /**
     * Gets all available info on authenticated user
     *
     * @return {Object} user
     */
    getCurrentUser: function() {
      if(currentUser) {
        currentUser.name = currentUser.firstName + ' ' + currentUser.lastName;
      }
      return currentUser;
    },

    /**
     * Gets current cart items.
     *
     * @return {Object} cart
     */
    getCurrentCart: function() {
      return cart;
    },

    /**
     * Sets all available info on authenticated user
     *
     * @return {Object} user
     */
    setCurrentUser: function(user) {
      currentUser = user;
      $rootScope.$broadcast('user.updated');
    },

    /**
     * Add item to cart items.
     * @return {Object} cart
     */
    addItemToCart: function(item) {
      item.qty = 1;
      CartServ.resource().addToCart({
        id: cart._id
      }, CartServ.convertItem(item), function(updatedCart) {
        cart = updatedCart;
        $rootScope.$broadcast('cart.updated');
      }, function(err) {
        console.log(err);
      });
    },

    /**
     * Remove item from cart items.
     * @return {Object} cart
     */
    removeItemFromCart: function(itemId) {
      if (angular.isUndefined(cart.products) && cart.products.length === 0) {
        return;
      }
      CartServ.resource().removeFromCart({
        id: cart._id,
        itemId: itemId
      }, function(updatedCart) {
        cart = updatedCart;
        $rootScope.$broadcast('cart.updated');
      }, function(err) {
        console.log(err);
      });
    },

    /**
     * Update user's cart with latest values.
     * @return {Object} cart
     */
    updateCart: function() {
      CartServ.resource().update({
        id: cart._id
      }, cart, function(updatedCart) {
        cart = updatedCart;
        $rootScope.$broadcast('cart.updated');
      }, function(err) {
        console.log(err);
      });
    },

    /**
     * Refresh user's cart with latest values.
     * @return {Object} cart
     */
    refreshCart: function() {
      cart = User.myCart({
        id: currentUser._id
      }).$promise.then(function(updatedCart) {
        cart = updatedCart;
        $rootScope.$broadcast('cart.updated');
      });
    },

    /**
     * Check if a user is logged in
     *
     * @return {Boolean}
     */
    isLoggedIn: function() {
      return currentUser.hasOwnProperty('role');
    },

    /**
     * Waits for currentUser to resolve before checking if user is logged in
     */
    isLoggedInAsync: function(cb) {
      if(currentUser.hasOwnProperty('$promise')) {
        currentUser.$promise.then(function() {
          cb(true);
        }).catch(function() {
          cb(false);
        });
      } else if(currentUser.hasOwnProperty('role')) {
        cb(true);
      } else {
        cb(false);
      }
    },

    /**
     * Check if a user is an admin
     *
     * @return {Boolean}
     */
    isAdmin: function() {
      return currentUser.role === 'admin';
    },

    /**
     * Get auth token
     */
    getToken: function() {
      return $cookieStore.get('token');
    }
  };
}]);

'use strict';

angular.module('zesty')
  .factory('Auth', ['$location', '$rootScope', '$http', 'User', '$cookieStore',
    '$q', 'CartServ', 'PromoCodeServ', 'AlertServ',
    function Auth($location, $rootScope, $http, User, $cookieStore, $q, CartServ, PromoCodeServ, AlertServ) {
  
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
     * Sets currenct cart to updated cart.
     * @param {Object} updatedCart The updated cart.
     */
    setCart: function(updatedCart) {
      cart = updatedCart;
      $rootScope.$broadcast('cart.updated');
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
     * Validate and apply promo code to cart.
     * @param  {String} promoCode The promocode to be applied.
     */
    applyPromoCode: function(promoCode) {
      if (promoCode && promoCode !== '') {
        CartServ.resource().promocode({
          id: cart._id,
          promoCode: promoCode
        }, cart, function(updatedCart) {
          cart = updatedCart;
          $rootScope.$broadcast('cart.updated');
        }, function(err) {
          console.log(err);
          $rootScope.$broadcast('cart.invalid.code', err);
        });
      } else {
        $rootScope.$broadcast('cart.invalid.code');
      }
    },

    /**
     * Remove applied promo code into cart.
     */
    removeCartCode: function() {
      if (cart.promoCode && cart.promoCode !== '') {
        CartServ.resource().removecode({
          id: cart._id
        }, function(updatedCart) {
          cart = updatedCart;
          $rootScope.$broadcast('cart.updated');
        }, function(err) {
          console.log(err);
          AlertServ.alert('Error while removing promo code. Please try again later.');
        });
      }

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

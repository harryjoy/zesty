/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/review-votes', require('./api/reviewVote'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/paymentMethods', require('./api/paymentMethods'));
  app.use('/api/payments', require('./api/payment'));
  app.use('/api/shippers', require('./api/shipper'));
  app.use('/api/suppilers', require('./api/suppiler'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/profiles', require('./api/profile'));
  app.use('/api/favorites', require('./api/favorite'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/carts', require('./api/cart'));
  app.use('/api/items', require('./api/item'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};

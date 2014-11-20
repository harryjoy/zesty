/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/profiles', require('./api/profile'));
  app.use('/api/favorites', require('./api/favorite'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/item_details', require('./api/item_details'));
  app.use('/api/payment_history', require('./api/payment_history'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/reviewss', require('./api/reviews'));
  app.use('/api/carts', require('./api/cart'));
  app.use('/api/items', require('./api/item'));
  app.use('/api/things', require('./api/thing'));
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

'use strict';

var _ = require('lodash');
var Cart = require('./cart.model');
var mongoose = require('mongoose');

// Updates an existing cart in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    var itemIds = [];
    _.forEach(cart.products, function (currentProduct) {
      itemIds.push(currentProduct._id);
    });
    _.forEach(itemIds, function (id) {
      cart.products.pull(id);
    });
    var updated = req.body;
    _.forEach(updated.products, function (currentProduct) {
      cart.products.push(currentProduct);
    });
    cart = calculateCartValues(cart);
    cart.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cart);
    });
  });
};

// get items in cart
exports.getCartItems = function(req, res, next) {
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart || !cart.products) { return res.send(404); }
    return res.json(200, cart.products);
  });
};

// add item to user's cart
exports.addToCart = function(req, res, next) {
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    var found = false;
    var item = req.body;
    if (!cart.products) {
      cart.products = [];
    } else if (cart.products.length > 0) {
      _.forEach(cart.products, function(currentProduct) {
        if (_.isEqual(currentProduct._id, mongoose.Types.ObjectId(item._id))) {
          found = true;
          currentProduct.qty++;
        }
      });
    }
    if (!found){
      cart.products.push(item);
    }
    cart = calculateCartValues(cart);
    cart.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cart);
    });
  });
};

// remove item from user's cart
exports.removeFromCart = function(req, res, next) {
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    if (!cart.products || cart.products.length === 0) {
      return res.json(200, cart);
    }
    var itemId = mongoose.Types.ObjectId(req.query.itemId);
    _.forEach(cart.products, function (currentProduct) {
      if(_.isEqual(currentProduct._id, itemId)) {
        cart.products.id(currentProduct._id).remove();
        return false;
      }
    });
    cart = calculateCartValues(cart);
    cart.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cart);
    });
  });
};

// calculate cart values before updating cart.
function calculateCartValues(cart) {
  cart.subTotal = 0;
  cart.grandTotal = 0;
  cart.currency = '';
  _.forEach(cart.products, function(product) {
    cart.subTotal = cart.subTotal + (product.qty * product.price);
    cart.grandTotal = cart.grandTotal + (product.qty * product.price);
    cart.currency = product.currency;
  });
  if (cart.promoCodeValue) {
    cart.grandTotal = cart.grandTotal - cart.promoCodeValue;
  }
  return cart;
}

// handles errors
function handleError(res, err) {
  return res.send(500, err);
}

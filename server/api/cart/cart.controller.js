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

// apply promocode to cart.
exports.applyPromoCode = function(req, res, next) {
  if (!req.promocode) { return res.send(404); }
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    var pc = req.promocode;
    if (!pc.isSpecific) { // if valid for all categories then just update.
      updateCartPromoCode(cart, pc, res);
    } else { // check if cart has any item that has specified category in promo code.
      var match = checkForSepecificPromoCode(pc.categories, cart.products);
      if (match) {
        updateCartPromoCode(cart, pc, res);
      } else {
        return res.send(404, {
          isError: true,
          message: "Entered promocode is not valid for current cart items."
        });
      }
    }
  });
};

// remove applied promocode to cart.
exports.removePromoCode = function(req, res, next) {
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    cart.promoCode = undefined;
    cart.promoCodeValue = undefined;
    cart.promoCodeInfo = undefined;
    cart.promoCodeExpiry = undefined;
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
    if (cart.promoCode) {
      if (!cart.products || cart.products.length === 0) {
        cart = invalidateCartPromoCode(cart);
      } else if (cart.isPromoCodeSpecific && cart.products) {
        if (!checkForSepecificPromoCode(cart.promoCodeCategories, cart.products)) {
          cart = invalidateCartPromoCode(cart);
        }
      }
    }
    cart = calculateCartValues(cart);
    cart.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cart);
    });
  });
};

// Empty the whole cart, i.e. remove all items from cart.
exports.emptyCart = function(req, res, next) {
  var order = req.order;
  Cart.findOne({
    customerId: order.customerId
  }, function (err, cart) {
    if (!err && cart) {
      cart.products = [];
      cart = calculateCartValues(invalidateCartPromoCode(cart));
      cart.save(function (err) {
        if (err) { console.log('error while empty cart'); }
        return res.json(200, order);
      });
    } else {
      console.log('error while empty cart');
      return res.json(200, order);
    }
  });
};

// check if promo code in cart is valid or not.
exports.checkPromoCode = function(req, res, next) {
  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }
    if (cart.promoCode && 
        (cart.promoCodeExpiry < new Date() || 
          (cart.isPromoCodeSpecific && 
            !checkForSepecificPromoCode(cart.promoCodeCategories, cart.products))
          )
        ) {
      cart = calculateCartValues(invalidateCartPromoCode(cart));
      cart.save(function (err) {
        if (err) { console.log('error while empty cart'); }
        return res.json(200, cart);
      });
    } else{
      return res.json(200, cart);
    }
  });
};

/**
 * ===================================
 *         HELPER FUNCTIONS
 * ===================================
 */

/**
 * calculate cart values before updating cart.
 * @param  {Cart} cart The cart to update.
 * @return {Cart}      Cart with updated values.
 */
function calculateCartValues(cart) {
  cart.subTotal = 0;
  cart.grandTotal = 0;
  cart.currency = '';
  if (cart.products && cart.products.length > 0) {
    _.forEach(cart.products, function(product) {
      cart.subTotal = cart.subTotal + (product.qty * product.price);
      cart.grandTotal = cart.grandTotal + (product.qty * product.price);
      cart.currency = product.currency;
    });
    cart.currency = cart.products[0].currency;
    if (cart.promoCodeValue) {
      if (cart.grandTotal > cart.promoCodeValue) {
        cart.grandTotal = cart.grandTotal - cart.promoCodeValue;
      } else{
        cart.grandTotal = 0;
      }
    }
  }
  return cart;
}

/**
 * Update promo code in the cart.
 * @param  {Cart} cart The cart to be updated
 * @param  {PromoCode} pc   The PromoCode to be applied.
 * @param  {Response} res  The HTTP response.
 */
function updateCartPromoCode(cart, pc, res) {
  cart.promoCode = pc.code;
  cart.promoCodeInfo = pc.info;
  cart.promoCodeExpiry = pc.expiry;
  cart.isPromoCodeSpecific = pc.isSpecific;
  cart.promoCodeCategories = pc.categories;
  if (pc.isPercent) {
    cart.promoCodeValue = (cart.grandTotal * pc.value) / 100;
  } else {
    cart.promoCodeValue = pc.value;
  }
  cart = calculateCartValues(cart);
  cart.save(function (err) {
    if (err) { return handleError(res, err); }
    return res.json(200, cart);
  });
}

/**
 * Remove promo code and related entries from cart.
 * @param  {Cart} cart The cart from which promo code will be deleted.
 * @return {Cart}      Updated cart.
 */
function invalidateCartPromoCode(cart) {
  cart.promoCode = undefined;
  cart.promoCodeValue = undefined;
  cart.promoCodeInfo = undefined;
  cart.promoCodeExpiry = undefined;
  cart.isPromoCodeSpecific = undefined;
  cart.promoCodeCategories = undefined;
  return cart;
}

/**
 * Check if cart items matches with specific category for promo code.
 * @param  {[String]} categories Promo code categoories
 * @param  {[CartItem]} products   Cart products.
 * @return {Boolean}            True if match is found.
 */
function checkForSepecificPromoCode(categories, products) {
  var match = false;
  if (!categories || !products) { return match; } // if any of them is not defined then return false.
  _.forEach(products, function(product) {
    if (match) { return false; } // if match then does not loop for other cart products.
    if (product.categories && product.categories.length > 0) {
      match = checkProductCategoryWithPromoCodeCategory(product.categories, categories);
    }
  });
  return match;
}

/**
 * Check if ProductCategory matches  with PromoCodeCategory
 * @param  {[String]} productCategories Array of product categories.
 * @param  {[String]} promoCodeCategories    Array of promoCode categories
 * @return {Boolean}                True if any of product category matches with any promocode category.
 */
function checkProductCategoryWithPromoCodeCategory(productCategories, promoCodeCategories) {
  var match = false;
  _.forEach(productCategories, function(productCategory) {
    _.forEach(promoCodeCategories, function(category) {
      if (productCategory.name === category) {
        match = true;
        return false;
      }
    });
  });
  return match;
}

// handles errors
function handleError(res, err) {
  return res.send(500, err);
}

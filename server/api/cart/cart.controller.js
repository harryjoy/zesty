'use strict';

var _ = require('lodash');
var Cart = require('./cart.model');
var mongoose = require('mongoose');
var config = require('../../config/environment');
var Order = require('../order/order.model');

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
    if (cart.promoCodeValue && cart.isPromoCodePercentage) {
      cart.promoCodeValue = (cart.calculateCartTotal() * cart.promoCodeActualValue) / 100;
    }
    cart.calculateCartValues();
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
          message: config.errorMessages.PROMO_CODE_CATEGORY_NOT_VALID
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
    cart.invalidatePromoCode();
    cart.calculateCartValues();
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
    if (cart.promoCodeValue && cart.isPromoCodePercentage) {
      cart.promoCodeValue = (cart.calculateCartTotal() * cart.promoCodeActualValue) / 100;
    }
    cart.calculateCartValues();
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
        cart.invalidatePromoCode();
      } else if (cart.isPromoCodeSpecific && cart.products) {
        if (!checkForSepecificPromoCode(cart.promoCodeCategories, cart.products)) {
          cart.invalidatePromoCode();
        }
      }
      if (cart.isPromoCodePercentage) {
        cart.promoCodeValue = (cart.calculateCartTotal() * cart.promoCodeActualValue) / 100;
      }
    }
    cart.calculateCartValues();
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
      cart.invalidatePromoCode();
      cart.calculateCartValues();
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
      cart.invalidatePromoCode();
      cart.calculateCartValues();
      cart.save(function (err) {
        if (err) { console.log('error while empty cart'); }
        return res.json(200, cart);
      });
    } else{
      return res.json(200, cart);
    }
  });
};

// check if user is logged in and cart does not exceed his budget limits
exports.checkCartLimits = function(req, res, next) {
  if (!req.user) { return res.send(404); }
  var user = req.user;
  var limits = user.cartLimits;

  Cart.findById(req.params.id, function (err, cart) {
    if (err) { return handleError(res, err); }
    if(!cart) { return res.send(404); }

    // if user don't have any limits set then return.
    if (limits.price <= 0 && limits.items <= 0 &&
      limits.priceMonthly <= 0 && limits.itemsMonthly <= 0 &&
      limits.priceYearly <= 0 && limits.itemsYearly <= 0) {
      return res.send(200, cart);
    }

    // 1. check cart price.
    if (limits.price > 0 && cart.grandTotal > limits.price) {
      return res.send(400, {
        isError: true,
        message: config.errorMessages.CART_PRICE_LIMIT_EXCEED
      });
    }

    // 2. check cart items.
    var cartItems = 0;
    _.forEach(cart.products, function(product) {
      cartItems += product.qty;
    });
    if (limits.items > 0 && cartItems > limits.items) {
      return res.send(400, {
        isError: true,
        message: config.errorMessages.CART_ITEMS_LIMIT_EXCEED
      });
    }
    req.cart = cart;
    req.cartItems = cartItems;
    next();
  });
};

// 3 & 4. check if user is logged in and cart does not exceed his monthly budget limits
exports.checkCartMonthlyLimits = function(req, res, next) {
  if (req.user.cartLimits.priceMonthly > 0 || req.user.cartLimits.itemsMonthly > 0) {
    checkMonthAndYearLimits(req, res, next, false);
  } else {
    next();
  }
};

// 5 & 6. check if user is logged in and cart does not exceed his yearly budget limits
exports.checkCartYearlyLimits = function(req, res, next) {
  if (req.user.cartLimits.priceYearly > 0 || req.user.cartLimits.itemsYearly > 0) {
    checkMonthAndYearLimits(req, res, next, true);
  } else {
    return res.send(200, req.cart);
  }
};

/**
 * ===================================
 *         HELPER FUNCTIONS
 * ===================================
 */

/**
 * Check user's monthly and yearly buget limits and respond accrdingly.
 * @param  {[type]}   req    [description]
 * @param  {[type]}   res    [description]
 * @param  {Function} next   [description]
 * @param  {Boolean}  isYear [description]
 * @return {[type]}          [description]
 */
function checkMonthAndYearLimits(req, res, next, isYear) {
  var limits = req.user.cartLimits;
  var priceLimit = 0, itemsLimit = 0;
  var priceError = '', itemsError = '';
  var end = new Date();
  var start = new Date();

  if (isYear) {
    priceLimit = limits.priceYearly;
    itemsLimit = limits.itemsYearly;
    start.setYear(start.getYear() - 1);
    priceError = config.errorMessages.YEARLY_PRICE_LIMIT_EXCEED;
    itemsError = config.errorMessages.YEARLY_ITEMS_LIMIT_EXCEED;
  } else{
    priceLimit = limits.priceMonthly;
    itemsLimit = limits.itemsMonthly;
    start.setMonth(start.getMonth() - 1);
    priceError = config.errorMessages.MONTHLY_PRICE_LIMIT_EXCEED;
    itemsError = config.errorMessages.MONTHLY_ITEMS_LIMIT_EXCEED;
  }
  
  if (priceLimit > 0 || itemsLimit > 0) {
    if (req.cart.grandTotal > priceLimit) {
      return res.send(400, {
        isError: true,
        message: priceError
      });
    } 
    if (req.cartItems > itemsLimit) {
      return res.send(400, {
        isError: true,
        message: itemsError
      });
    }
    // get user's orders aggregation values and check with limits.
    getUserOrderTotalsAggregation(start, end, req.user._id).exec(function(err, result){
      if (err) { return handleError(res, err); }
      if (req.cart.grandTotal > (priceLimit - result.grandTotal)) {
        return res.send(400, {
          isError: true,
          message: priceError
        });
      } 
      if (req.cartItems > (itemsLimit - result.items)) {
        return res.send(400, {
          isError: true,
          message: itemsError
        });
      }
      if (isYear) {
        return res.send(200, req.cart);
      } else {
        next();
      }
    });
  }
}

/**
 * Aggregate on order collection to get monhtly or yearly data for a user.
 * @param  {Date} start  Start date.
 * @param  {Date} end    End Daye
 * @param  {ObjectId} userId User's mongo id.
 */
function getUserOrderTotalsAggregation(start, end, userId) {
  return Order.aggregate().match({
    'customerId': userId,
    'processed' : true,
    'transcationSuccess' : true,
    'orderDate': { 
        '$lt': end, 
        '$gte': start
    }
  }).group({
    _id: '$customerId',
    products: {
      $push: {
        'p': '$products'
      }
    },
    grandTotal: {
      $sum: '$grandTotal'
    }
  }).unwind('products').unwind('products.p').group({
    _id: '$_id',
    items: {
      $sum: '$products.p.qty'
    },
    grandTotal: {
      $first: '$grandTotal'
    }
  });
}

/**
 * Update promo code in the cart.
 * @param  {Cart} cart The cart to be updated
 * @param  {PromoCode} pc   The PromoCode to be applied.
 * @param  {Response} res  The HTTP response.
 */
function updateCartPromoCode(cart, pc, res) {
  cart.applyPromoCode(pc);
  cart.calculateCartValues();
  cart.save(function (err) {
    if (err) { return handleError(res, err); }
    return res.json(200, cart);
  });
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

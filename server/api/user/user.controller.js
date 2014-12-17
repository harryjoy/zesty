'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var mongoose = require('mongoose');
var Review = require('../review/review.model');
var Favorite = require('../favorite/favorite.model');
var Item = require('../item/item.model');
var Cart = require('../cart/cart.model');
var Order = require('../order/order.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Update user
 */
exports.update = function(req, res, next) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * add address for a user
 */
exports.addAddress = function(req, res, next) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.addresses.push(req.body)
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * add address for a user
 */
exports.editAddress = function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = req.body;
    _.forEach(user.addresses, function (address) {
      if (_.isEqual(address._id, mongoose.Types.ObjectId(updated._id))) {
        address = _.merge(address, updated);
      }
    });
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * Make selected address default
 */
exports.makeAddressDefault = function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var addressId = mongoose.Types.ObjectId(req.params.adderssId);
    _.forEach(user.addresses, function (address) {
      address.isDefault = _.isEqual(address._id, addressId);
    });
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * Delete sepecified address.
 */
exports.deleteAddress = function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var addressId = mongoose.Types.ObjectId(req.params.adderssId);
    _.forEach(user.addresses, function (address) {
      if(_.isEqual(address._id, addressId)) {
        user.addresses.id(address._id).remove();
        return false;
      }
    });
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * add card for a user
 */
exports.addCard = function(req, res, next) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    user.cards.push(req.body)
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * add card for a user
 */
exports.editCard = function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var updated = req.body;
    _.forEach(user.cards, function (card) {
      if (_.isEqual(card._id, mongoose.Types.ObjectId(updated._id))) {
        card = _.merge(card, updated);
      }
    });
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

/**
 * Delete sepecified card.
 */
exports.deleteCard = function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var cardId = mongoose.Types.ObjectId(req.params.cardId);
    _.forEach(user.cards, function (card) {
      if(_.isEqual(card._id, cardId)) {
        user.cards.id(card._id).remove();
        return false;
      }
    });
    user.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};

// get reviews made by this user.
exports.reviews = function(req, res, next) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var pageNumber = req.query.pageNumber || 0;
  var query = {
    customerId : req.params.id
  };
  if (req.query.rate) {
    if (req.query.rate === '2') {
      query.rating = {'$in': [2, 3]};
    } else if (req.query.rate === '4') {
      query.rating = {'$in': [4, 5]};
    } else {
      query.rating = req.query.rate;
    }
  }
  Review.find(query)
  .limit(pageSize)
  .skip(pageNumber * pageSize)
  .sort('-createdAt')
  .exec(function (err, reviews) {
    if(err) { return handleError(res, err); }
    var result = {
      data: reviews
    };
    Review.count(query).exec(function (err, count) {
      if(err) { return handleError(res, err); }
      result.count = count;
      return res.json(200, result);
    })
  });
};

// get ratings made by this user.
exports.ratings = function(req, res, next) {
  Review.aggregate().match({
    'customerId': mongoose.Types.ObjectId(req.params.id)
  }).group({
    _id: '$rating',
    count: {
      $sum: 1
    } 
  }).exec(function (err, result){
    if(err) { return handleError(res, err); }
    return res.json(200, result);
  });
};

// get users favorites/wishlist items
exports.favorites = function(req, res, next) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var pageNumber = req.query.pageNumber || 0;
  Favorite.find({
    customerId: mongoose.Types.ObjectId(req.params.id)
  }).limit(pageSize).skip(pageNumber * pageSize).sort('-createdAt')
  .exec(function (err, favorites) {
    if(err) { return handleError(res, err); }
    if(!favorites) { return res.send(404); }
    var productIds = [];
    _.forEach(favorites, function (fav) {
      productIds.push(fav.productId);
    });
    if(!productIds || productIds.length === 0) { return res.send(404); }
    Item.find({
      _id: {
        '$in': productIds
      }
    }).exec(function (err, items) {
      if(err) { return handleError(res, err); }
      if(!items) { return res.send(404); }
      var result = {
        data: items
      };
      Favorite.count({
        customerId: mongoose.Types.ObjectId(req.params.id)
      }).exec(function(err, count) {
        if(err) { return handleError(res, err); }
        result.count = count;
        return res.json(200, result);
      });
    });
  });
};

// get user's cart
exports.myCart = function(req, res, next) {
  Cart.findOne({
    customerId: req.user._id
  }).exec(function(err, cart) {
    if(err) { return handleError(res, err); }
    if(!cart) {
      cart = new Cart();
      cart.customerId = req.user._id;
      cart.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, cart);
      });
    } else {
      return res.json(200, cart);
    }
  });
};

// get user's orders
exports.orders = function(req, res, next) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var pageNumber = req.query.pageNumber || 0;
  Order.count({
    customerId: mongoose.Types.ObjectId(req.params.id)
  }, function(err, count) {
    if(err) { return handleError(res, err); }
    if (count === 0) { return res.send(404); }
    var result = {
      count: count
    };
    Order.find({
      customerId: mongoose.Types.ObjectId(req.params.id)
    }).limit(pageSize).skip(pageNumber * pageSize).sort('-createdAt')
    .exec(function (err, orders) {
      if(err) { return handleError(res, err); }
      if(!orders) { return res.send(404); }
      result.data = orders;
      return res.json(200, result);
    });
  });
};

// function to handle errors in controllers
function handleError(res, err) {
  return res.send(500, err);
}

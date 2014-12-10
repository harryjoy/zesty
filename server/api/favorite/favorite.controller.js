'use strict';

var Favorite = require('./favorite.model');
var mongoose = require('mongoose');
var _ = require('lodash');

// check if user has this product in his favorite
exports.checkForFav = function(req, res, next) {
  Favorite.findOne({
    customerId: req.user._id,
    productId: req.query.productId
  }, function (err, favorite) {
    if(err) { return handleError(res, err); }
    if(!favorite) { return res.send(404); }
    return res.json(favorite);
  });
};

// check if products are in user's favorite
exports.checkForProductFav = function(req, res, next) {
  if (!Array.isArray(req.query.productId)) {
    req.query.productId = [req.query.productId];
  }
  var productIds = []
  _.forEach(req.query.productId, function (productId) {
    productIds.push(mongoose.Types.ObjectId(productId));
  });
  Favorite.find({
    customerId: req.user._id,
    productId: {
      '$in': productIds
    }
  }, function (err, favorite) {
    if(err) { return handleError(res, err); }
    if(!favorite) { return res.send(404); }
    return res.json(favorite);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
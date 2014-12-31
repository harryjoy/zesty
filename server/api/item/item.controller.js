'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var Review = require('../review/review.model');
var Favorite = require('../favorite/favorite.model');
var config = require('../../config/environment');
var numeral = require('numeral');
var mongoose = require('mongoose');

// Get list of items
exports.index = function(req, res) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var timeToFilter = req.query.time || new Date();
  var isDeleted = req.query.isDeleted || false;
  var query = {
    createdAt: { $lt : timeToFilter },
    deleted: isDeleted
  };
  if (req.query.published) {
    query.active = true;
  }
  Item.find(query, {
    mainImage: 1,
    title: 1,
    categories: 1,
    active: 1,
    deleted: 1,
    price: 1,
    specialPrice: 1,
    isSpecialDiscount: 1,
    isSpecialScheduled: 1,
    specialPriceStartDate: 1,
    specialPriceEndDate: 1,
    createdAt: 1,
    featured: 1,
    productType: 1,
    currency: 1,
    description: 1,
    reviews: 1,
    rating: 1,
    slug: 1
  }).limit(pageSize).sort('-createdAt').exec(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// search for items
exports.search = function(req, res, next) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var pageNumber = req.query.pageNumber || 0;
  var name = req.query.name || '';
  var searchForBlank = req.query.searchBlank || false;
  if (name === '' && !searchForBlank) { // name is blank and searchForBlank flag is not active
    return res.send(200, []);
  }
  Item.find({
    title: new RegExp(name, "i"),  // for like query
    deleted: false
  }, {
    title: 1
  }).limit(pageSize).skip(pageNumber * pageSize)
  .sort('title').exec(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// get featured items.
exports.featured = function(req, res, next) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var pageNumber = req.query.pageNumber || 0;
  Item.find({
    featured: true,
    deleted: false
  }).limit(pageSize).skip(pageNumber * pageSize)
  .sort('-createdAt').exec(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// Get a single item and put it in req object.
// This method will only be used as step for other methods.
exports.getItem = function(req, res, next) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    req.item = item;
    next();
  });
};

// Get and return a single item
exports.show = function(req, res) {
  if(!req.item) { return res.send(404); }
  return res.json(req.item);
};

// Creates a new item in the DB.
exports.create = function(req, res) {
  Item.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    return res.json(201, item);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  if(!req.item) { return res.send(404); }
  var updated = _.merge(req.item, req.body);
  updated.save(function (err) {
    if (err) { return handleError(res, err); }
    return res.json(200, updated);
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  if(!req.item) { return res.send(404); }
  req.item.remove(function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

// Enable/Disable the deleted flag of an item.
exports.updateDeletedFlag = function(req, res) {
  if(!req.item) { return res.send(404); }
  req.item.deleted = !req.item.deleted;
  req.item.save(function (err) {
    if (err) { return handleError(res, err); }
    return res.json(200, req.item);
  });
};

// get reviews for selected item.
exports.reviews = function(req, res) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var pageNumber = req.query.pageNumber || 0;
  var query = {
    productId : req.params.id
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
    return res.json(200, reviews);
  });
};

// add review for selected item.
exports.addReview = function(req, res, next) {
  if(!req.item) { return res.send(404); }
  var item = req.item;
  Review.count({'productId': req.params.id}, function(err, count) {
    if(err) { return handleError(res, err); }
    var review = new Review(req.body);
    review.first = (count === 0);
    review.setProduct(item);
    Review.create(review, function(err, review) {
      if(err) { return handleError(res, err); }
      if (!item.reviews) {
        item.review = 0;
      }
      item.reviews = item.reviews + 1;
      req.item = item;
      req.review = review;
      next();
    });
  });
};

// edit item review
exports.editReview = function(req, res, next) {
  if(!req.item) { return res.send(404); }
  var item = req.item;
  Review.findById(req.body._id, function(err, review) {
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      req.item = item;
      req.review = review;
      next();
    });
  });
};

// update overall ratings for an item
exports.updateItemRatings = function(req, res, next) {
  if (!req.item || !req.review) { return res.send(404); }
  var item = req.item, review = req.review;
  Review.aggregate().match({'productId': item._id}).group({
    _id: '$productId',
    average: {
      $avg: '$rating'
    } 
  }).exec(function (err, result){
    if(err) { return handleError(res, err); }
    item.rating = numeral(result[0].average).format('0.00');
    item.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(201, review);
    });
  });
};

// get related items for selected item.
exports.related = function(req, res) {
  if(!req.item) { return res.send(404); }
  var item = req.item;
  var categories = [];
  _.forEach(item.categories, function (category) {
    categories.push(category.name);
  });
  Item.find({
    'categories.name' : { '$in' : categories },
    '_id' : { '$ne' : item._id },
    deleted: false
  }, function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// get ratings for selected item in groups of number of stars.
exports.ratings = function(req, res, next) {
  Review.aggregate().match({'productId': mongoose.Types.ObjectId(req.params.id)}).group({
    _id: '$rating',
    count: {
      $sum: 1
    } 
  }).exec(function (err, result){
    if(err) { return handleError(res, err); }
    return res.json(200, result);
  });
};

// add selected item to favorite
exports.addToFavorite = function(req, res, next) {
  if(!req.item) { return res.send(404); }
  var item = req.item;
  Favorite.findOne({
    'productId': req.params.id, 
    'customerId': req.user._id
  }, function(err, favorite) {
    if(err) { return handleError(res, err); }
    if(favorite) { return res.send(200, favorite); }
    Favorite.create(req.body, function(err, fav) {
      if(err) { return handleError(res, err); }
      return res.json(201, fav);
    });
  })
};

// remove selected item from favorite
exports.removeFavorite = function(req, res, next) {
  var customerId = req.user._id;
  Favorite.findOne({
    'productId': req.params.id, 
    'customerId': customerId
  }).exec(function(err, fav) {
    if(err) { return handleError(res, err); }
    if(!fav) { return res.send(404); }
    fav.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.json(204);
    });
  });
};

// get different product counts
exports.counts = function(req, res, next) {
  var result = {
    all: 0,
    published: 0,
    deleted: 0
  };
  Item.countAsync({
    deleted: false
  }).then(function(count) {
    if(count <= 0) { return res.send(404); }
    result.all = count;
    return Item.countAsync({
      deleted: true
    });
  }).then(function(count) {
    result.deleted = count;
    return Item.countAsync({
      active: true,
      deleted: false
    });
  }).then(function(count) {
    result.published = count;
    return res.send(200, result);
  }).catch(function(err) {
    return handleError(res, err);
  });
};

// Deletes all items whose id mathces with req param ids from the DB.
exports.destroyMultiple = function(req, res) {
  operateMultiple(req.query.ids, 'deleted', true, res, 204);
};

// Recover all items whose id mathces with req param ids from the DB.
exports.recoverMultiple = function(req, res) {
  operateMultiple(req.body.ids, 'deleted', false, res, 200);
};

// Publish all items whose id mathces with req param ids from the DB.
exports.publishMultiple = function(req, res) {
  operateMultiple(req.body.ids, 'active', true, res, 200);
};

/**
 * Operate on multiple at the same time.
 * @param  {[String]} ids        Array of item ids.
 * @param  {String} field      Name of fields to be updated.
 * @param  {Object} value      Value of updated field.
 * @param  {Object} res        Response object.
 * @param  {Number} statusCode Response status code to be returened in case of success.
 */
function operateMultiple(ids, field, value, res, statusCode) {
  if (!ids) {
    return res.send(400);
  }
  if (!Array.isArray(ids)) {
    ids = [ids];
  }
  var updated = {};
  updated[field] = value;
  Item.update({
    '_id': { '$in': ids }
  }, updated, { multi: true }, function(err) {
    if(err) { return handleError(res, err); }
    return res.send(statusCode);
  });
}

// handle erroneous response
function handleError(res, err) {
  return res.send(500, err);
}
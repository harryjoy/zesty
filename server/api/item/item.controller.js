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
  Item.find({
    createdAt: { $lt : timeToFilter }
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
    title: new RegExp(name, "i") // for like query
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
    featured: true
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
    '_id' : { '$ne' : item._id }
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

function handleError(res, err) {
  return res.send(500, err);
}
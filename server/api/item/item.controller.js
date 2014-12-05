'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var Review = require('../review/review.model');
var config = require('../../config/environment');

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

// Get a single item
exports.show = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    return res.json(item);
  });
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
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, item);
    });
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.reviews = function(req, res) {
  Review.find({ productId : req.params.id }, function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

exports.related = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    var categories = [];
    _.forEach(item.categories, function (category) {
      categories.push(category.name);
    });
    Item.find({ 'categories.name' : { '$in' : categories }, '_id' : { '$ne' : item._id } }, function (err, items) {
      if(err) { return handleError(res, err); }
      return res.json(200, items);
    });
  });
};

exports.ratings = function(req, res, next) {
  Review.aggregate().group({
    _id: '$rating',
    count: {
      $sum: 1
    } 
  }).exec(function (err, result){
    if(err) { return handleError(res, err); }
    return res.json(200, result);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
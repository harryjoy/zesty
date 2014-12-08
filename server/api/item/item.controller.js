'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var Review = require('../review/review.model');
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

// get reviews for selected item.
exports.reviews = function(req, res) {
  var pageSize = req.query.pageSize || config.pagination.size;
  var pageNumber = req.query.pageNumber || 0;
  Review.find({
    productId : req.params.id
  })
  .limit(pageSize)
  .skip(pageNumber * pageSize)
  .sort('-createdAt')
  .exec(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// add review for selected item.
exports.addReview = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    Review.count({'productId': req.params.id}, function(err, count) {
      if(err) { return handleError(res, err); }
      var review = req.body;
      review.first = (count === 0);
      if (review.customerId) {
        review.certified = true;
      }
      Review.create(review, function(err, review) {
        if(err) { return handleError(res, err); }
        item.reviews = item.reviews + 1;
        Review.aggregate().match({'productId': mongoose.Types.ObjectId(req.params.id)}).group({
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
      });
    });
  });
};

// get related items for selected item.
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

function handleError(res, err) {
  return res.send(500, err);
}
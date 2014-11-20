'use strict';

var _ = require('lodash');
var Reviews = require('./reviews.model');

// Get list of reviewss
exports.index = function(req, res) {
  Reviews.find(function (err, reviewss) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviewss);
  });
};

// Get a single reviews
exports.show = function(req, res) {
  Reviews.findById(req.params.id, function (err, reviews) {
    if(err) { return handleError(res, err); }
    if(!reviews) { return res.send(404); }
    return res.json(reviews);
  });
};

// Creates a new reviews in the DB.
exports.create = function(req, res) {
  Reviews.create(req.body, function(err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(201, reviews);
  });
};

// Updates an existing reviews in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reviews.findById(req.params.id, function (err, reviews) {
    if (err) { return handleError(res, err); }
    if(!reviews) { return res.send(404); }
    var updated = _.merge(reviews, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reviews);
    });
  });
};

// Deletes a reviews from the DB.
exports.destroy = function(req, res) {
  Reviews.findById(req.params.id, function (err, reviews) {
    if(err) { return handleError(res, err); }
    if(!reviews) { return res.send(404); }
    reviews.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
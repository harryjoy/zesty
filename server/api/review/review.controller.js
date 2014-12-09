'use strict';

var _ = require('lodash');
var Review = require('./review.model');
var ReviewVote = require('../reviewVote/reviewVote.model');

// Get list of reviews
exports.index = function(req, res) {
  Review.find(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// Get a single review
exports.show = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    return res.json(review);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  Review.create(req.body, function(err, review) {
    if(err) { return handleError(res, err); }
    return res.json(201, review);
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, review);
    });
  });
};

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// vote for a review. (either helpful or not helpful)
exports.addReviewVote = function(req, res) {
  var vote = new ReviewVote(req.body);
  if (vote.customerId && vote.reviewId) {
    Review.findById(req.params.id, function (err, review) {
      if(err) { return handleError(res, err); }
      if(!review) { return res.send(404); }
      ReviewVote.create(vote, function(err, reviewVote) {
        if(err) { return handleError(res, err); }
        if (vote.vote === 1) {
          review.helpful = review.helpful + 1;
        } else if (vote.vote === 2) {
          review.unhelpful = review.unhelpful + 1;
        } else if (vote.vote === 3) {
          review.abuses = review.abuses + 1;
        }
        review.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, review);
        });
      });
    });
  } else {
    return res.send(404);
  }
};

function handleError(res, err) {
  return res.send(500, err);
}
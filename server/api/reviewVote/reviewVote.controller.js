'use strict';

var _ = require('lodash');
var Reviewvote = require('./reviewVote.model');

// Get list of reviewVotes
exports.index = function(req, res) {
  if(!Array.isArray(req.query.reviewIds)) {
    req.query.reviewIds = [req.query.reviewIds];
  }
  Reviewvote.find({
    customerId: req.query.customerId,
    reviewId: {'$in': req.query.reviewIds}
  }, function (err, reviewVotes) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviewVotes);
  });
};

// Get a single reviewVote
exports.show = function(req, res) {
  Reviewvote.findById(req.params.id, function (err, reviewVote) {
    if(err) { return handleError(res, err); }
    if(!reviewVote) { return res.send(404); }
    return res.json(reviewVote);
  });
};

// Creates a new reviewVote in the DB.
exports.create = function(req, res) {
  Reviewvote.create(req.body, function(err, reviewVote) {
    if(err) { return handleError(res, err); }
    return res.json(201, reviewVote);
  });
};

// Updates an existing reviewVote in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reviewvote.findById(req.params.id, function (err, reviewVote) {
    if (err) { return handleError(res, err); }
    if(!reviewVote) { return res.send(404); }
    var updated = _.merge(reviewVote, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reviewVote);
    });
  });
};

// Deletes a reviewVote from the DB.
exports.destroy = function(req, res) {
  Reviewvote.findById(req.params.id, function (err, reviewVote) {
    if(err) { return handleError(res, err); }
    if(!reviewVote) { return res.send(404); }
    reviewVote.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
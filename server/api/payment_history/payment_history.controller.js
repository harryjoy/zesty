'use strict';

var _ = require('lodash');
var PaymentHistory = require('./payment_history.model');

// Get list of payment_historys
exports.index = function(req, res) {
  PaymentHistory.find(function (err, payment_historys) {
    if(err) { return handleError(res, err); }
    return res.json(200, payment_historys);
  });
};

// Get a single payment_history
exports.show = function(req, res) {
  PaymentHistory.findById(req.params.id, function (err, payment_history) {
    if(err) { return handleError(res, err); }
    if(!payment_history) { return res.send(404); }
    return res.json(payment_history);
  });
};

// Creates a new payment_history in the DB.
exports.create = function(req, res) {
  PaymentHistory.create(req.body, function(err, payment_history) {
    if(err) { return handleError(res, err); }
    return res.json(201, payment_history);
  });
};

// Updates an existing payment_history in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PaymentHistory.findById(req.params.id, function (err, payment_history) {
    if (err) { return handleError(res, err); }
    if(!payment_history) { return res.send(404); }
    var updated = _.merge(payment_history, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, payment_history);
    });
  });
};

// Deletes a payment_history from the DB.
exports.destroy = function(req, res) {
  PaymentHistory.findById(req.params.id, function (err, payment_history) {
    if(err) { return handleError(res, err); }
    if(!payment_history) { return res.send(404); }
    payment_history.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
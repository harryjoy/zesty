'use strict';

var _ = require('lodash');
var Paymentmethods = require('./paymentMethods.model');

// Get list of paymentMethodss
exports.index = function(req, res) {
  Paymentmethods.find(function (err, paymentMethodss) {
    if(err) { return handleError(res, err); }
    return res.json(200, paymentMethodss);
  });
};

// Get a single paymentMethods
exports.show = function(req, res) {
  Paymentmethods.findById(req.params.id, function (err, paymentMethods) {
    if(err) { return handleError(res, err); }
    if(!paymentMethods) { return res.send(404); }
    return res.json(paymentMethods);
  });
};

// Creates a new paymentMethods in the DB.
exports.create = function(req, res) {
  Paymentmethods.create(req.body, function(err, paymentMethods) {
    if(err) { return handleError(res, err); }
    return res.json(201, paymentMethods);
  });
};

// Updates an existing paymentMethods in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Paymentmethods.findById(req.params.id, function (err, paymentMethods) {
    if (err) { return handleError(res, err); }
    if(!paymentMethods) { return res.send(404); }
    var updated = _.merge(paymentMethods, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, paymentMethods);
    });
  });
};

// Deletes a paymentMethods from the DB.
exports.destroy = function(req, res) {
  Paymentmethods.findById(req.params.id, function (err, paymentMethods) {
    if(err) { return handleError(res, err); }
    if(!paymentMethods) { return res.send(404); }
    paymentMethods.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
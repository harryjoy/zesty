'use strict';

var _ = require('lodash');
var Shipper = require('./shipper.model');

// Get list of shippers
exports.index = function(req, res) {
  Shipper.find(function (err, shippers) {
    if(err) { return handleError(res, err); }
    return res.json(200, shippers);
  });
};

// Get a single shipper
exports.show = function(req, res) {
  Shipper.findById(req.params.id, function (err, shipper) {
    if(err) { return handleError(res, err); }
    if(!shipper) { return res.send(404); }
    return res.json(shipper);
  });
};

// Creates a new shipper in the DB.
exports.create = function(req, res) {
  Shipper.create(req.body, function(err, shipper) {
    if(err) { return handleError(res, err); }
    return res.json(201, shipper);
  });
};

// Updates an existing shipper in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shipper.findById(req.params.id, function (err, shipper) {
    if (err) { return handleError(res, err); }
    if(!shipper) { return res.send(404); }
    var updated = _.merge(shipper, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, shipper);
    });
  });
};

// Deletes a shipper from the DB.
exports.destroy = function(req, res) {
  Shipper.findById(req.params.id, function (err, shipper) {
    if(err) { return handleError(res, err); }
    if(!shipper) { return res.send(404); }
    shipper.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
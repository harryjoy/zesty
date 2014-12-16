'use strict';

var _ = require('lodash');
var Promocode = require('./promocode.model');

// Get list of promocodes
exports.index = function(req, res) {
  Promocode.find(function (err, promocodes) {
    if(err) { return handleError(res, err); }
    return res.json(200, promocodes);
  });
};

// Get a single promocode
exports.show = function(req, res) {
  Promocode.findById(req.params.id, function (err, promocode) {
    if(err) { return handleError(res, err); }
    if(!promocode) { return res.send(404); }
    return res.json(promocode);
  });
};

// Creates a new promocode in the DB.
exports.create = function(req, res) {
  Promocode.create(req.body, function(err, promocode) {
    if(err) { return handleError(res, err); }
    return res.json(201, promocode);
  });
};

// Updates an existing promocode in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Promocode.findById(req.params.id, function (err, promocode) {
    if (err) { return handleError(res, err); }
    if(!promocode) { return res.send(404); }
    var updated = _.merge(promocode, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, promocode);
    });
  });
};

// Deletes a promocode from the DB.
exports.destroy = function(req, res) {
  Promocode.findById(req.params.id, function (err, promocode) {
    if(err) { return handleError(res, err); }
    if(!promocode) { return res.send(404); }
    promocode.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get a single promocode by code
exports.check = function(req, res, next) {
  Promocode.findOne({
    code: req.query.promoCode,
    active: true,
    expiry: {
      '$gt': new Date()
    }
  }, function (err, promocode) {
    if(err) { return handleError(res, err); }
    if(!promocode) { return res.send(404); }
    console.log('promocode', promocode);
    req.promocode = promocode;
    next();
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
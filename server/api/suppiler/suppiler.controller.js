'use strict';

var _ = require('lodash');
var Suppiler = require('./suppiler.model');

// Get list of suppilers
exports.index = function(req, res) {
  Suppiler.find(function (err, suppilers) {
    if(err) { return handleError(res, err); }
    return res.json(200, suppilers);
  });
};

// Get a single suppiler
exports.show = function(req, res) {
  Suppiler.findById(req.params.id, function (err, suppiler) {
    if(err) { return handleError(res, err); }
    if(!suppiler) { return res.send(404); }
    return res.json(suppiler);
  });
};

// Creates a new suppiler in the DB.
exports.create = function(req, res) {
  Suppiler.create(req.body, function(err, suppiler) {
    if(err) { return handleError(res, err); }
    return res.json(201, suppiler);
  });
};

// Updates an existing suppiler in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Suppiler.findById(req.params.id, function (err, suppiler) {
    if (err) { return handleError(res, err); }
    if(!suppiler) { return res.send(404); }
    var updated = _.merge(suppiler, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, suppiler);
    });
  });
};

// Deletes a suppiler from the DB.
exports.destroy = function(req, res) {
  Suppiler.findById(req.params.id, function (err, suppiler) {
    if(err) { return handleError(res, err); }
    if(!suppiler) { return res.send(404); }
    suppiler.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
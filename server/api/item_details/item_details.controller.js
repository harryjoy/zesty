'use strict';

var _ = require('lodash');
var ItemDetails = require('./item_details.model');

// Get list of item_detailss
exports.index = function(req, res) {
  ItemDetails.find(function (err, item_detailss) {
    if(err) { return handleError(res, err); }
    return res.json(200, item_detailss);
  });
};

// Get a single item_details
exports.show = function(req, res) {
  ItemDetails.findById(req.params.id, function (err, item_details) {
    if(err) { return handleError(res, err); }
    if(!item_details) { return res.send(404); }
    return res.json(item_details);
  });
};

// Creates a new item_details in the DB.
exports.create = function(req, res) {
  ItemDetails.create(req.body, function(err, item_details) {
    if(err) { return handleError(res, err); }
    return res.json(201, item_details);
  });
};

// Updates an existing item_details in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ItemDetails.findById(req.params.id, function (err, item_details) {
    if (err) { return handleError(res, err); }
    if(!item_details) { return res.send(404); }
    var updated = _.merge(item_details, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, item_details);
    });
  });
};

// Deletes a item_details from the DB.
exports.destroy = function(req, res) {
  ItemDetails.findById(req.params.id, function (err, item_details) {
    if(err) { return handleError(res, err); }
    if(!item_details) { return res.send(404); }
    item_details.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
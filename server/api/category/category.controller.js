'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var Item = require('../item/item.model');

// Get list of categories
exports.index = function(req, res) {
  Category.find(function (err, categories) {
    if(err) { return handleError(res, err); }
    if (!categories || categories.length === 0) { res.send(404); }
    if (!req.query.productCounts) {
      return res.json(200, categories);
    } else {
      var categoryIds = [];
      _.forEach(categories, function(category) {
        categoryIds.push(category._id);
      });
      Item.aggregate().match({
        'categories._id': {
          '$in': categoryIds
        }
      }).group({
        '_id': '$categories._id',
        count: {
          $sum: 1
        }
      }).exec(function(err, counts) {
        if (!err) {
          _.forEach(categories, function(category) {
            category.productCount = 0;
            _.forEach(counts, function(count) {
              if (_.isEqual(category._id, count._id[0])) {
                category.productCount = count.count;
              }
            });
          });
        }
        return res.json(200, categories);
      });
    }
  });
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    return res.json(category);
  });
};

// Creates a new category in the DB.
exports.create = function(req, res) {
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.json(201, category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {
  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.send(404); }
    category.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes all categories whose id mathces with req param ids from the DB.
exports.destroyMultiple = function(req, res) {
  if (!Array.isArray(req.query.ids)) {
    req.query.ids = [req.query.ids];
  }
  Category.remove({
    '_id': {
      '$in': req.query.ids
    }
  }, function(err) {
    if(err) { return handleError(res, err); }
    return res.send(204);
  });
};

// Get items of this category
exports.items = function(req, res) {
  Item.find({'categories._id' : req.params.id}, function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
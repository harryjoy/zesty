'use strict';

var _ = require('lodash');
var Order = require('./order.model');
var moment = require('moment');

// Creates a new order in the DB.
exports.create = function(req, res) {
  Order.create(req.body, function(err, order) {
    if(err) { return handleError(res, err); }
    return res.json(201, order);
  });
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    return res.json(order);
  });
};

// Updates an existing order in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Order.findById(req.params.id, function (err, order) {
    if (err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    var itemIds = [];
    _.forEach(order.products, function (currentProduct) {
      itemIds.push(currentProduct._id);
    });
    _.forEach(itemIds, function (id) {
      order.products.pull(id);
    });
    var updated = req.body;
    order = _.merge(order, updated);
    _.forEach(updated.products, function (currentProduct) {
      order.products.push(currentProduct);
    });
    order.save(function (err, or) {
      if (err) { return handleError(res, err); }
      return res.json(200, or);
    });
  });
};

// get order for a customer
// only get orders that belong to this customer and that are created in last hour
// and are remaining to process.
exports.getOrderByCustomer = function(req, res, next) {
  var time = moment().subtract(1, 'hours');
  Order.findOne({
    customerId: req.query.customerId,
    createdAt: {
      '$gt' : time
    },
    processed: false
  }, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    return res.json(200, order);
  });
};

// update payment information in order.
exports.updatePaymentInfo = function(req, res, next) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.send(404); }
    order.paymentMethod = req.body.paymentMethod;
    order.paymentDate = new Date();
    order.processed = true;
    // TODO: update payment info and check for transaction status there.
    order.transcationStatus = 0;
    order.transcationSuccess = true;
    order.save(function (err, or) {
      if (err) { return handleError(res, err); }
      req.order = or;
      next();
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
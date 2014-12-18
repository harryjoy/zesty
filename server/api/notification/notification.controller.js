'use strict';

var _ = require('lodash');
var Notification = require('./notification.model');
var config = require('../../config/environment');

// Get list of notifications
exports.index = function(req, res) {
  Notification.find(function (err, notifications) {
    if(err) { return handleError(res, err); }
    return res.json(200, notifications);
  });
};

// Get a single notification
exports.show = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    return res.json(notification);
  });
};

// Creates a new notification in the DB.
exports.create = function(req, res) {
  Notification.create(req.body, function(err, notification) {
    if(err) { return handleError(res, err); }
    return res.json(201, notification);
  });
};

// Updates an existing notification in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    var updated = _.merge(notification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, notification);
    });
  });
};

// Deletes a notification from the DB.
exports.destroy = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    notification.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// add a notification for order placed.
exports.notifyOrderPlaced = function(req, res, next) {
  var notification = new Notification();
  notification.customerId = req.order.customerId;
  notification.tme = new Date();
  notification.type = config.enums.NOTIFICATION_TYPES.order;
  notification.message = 'Order Confirmation - Your Order [' +
      req.order.getOrderDisplayNumber(config.orderPrefix) + '] has been successfully placed!';
  notification.summary = 'Thank you for the order. ' +
      'We will send you another email once the items in your order have been shipped. ' +
      'Meanwhile, you can check the status of your order in my orders.';
  notification.save(function(err, notify) {
    if (err) { handleError(res, err); }
    next();
  });
};

// add a notification for order shipped.
exports.notifyOrderShipped = function(req, res, next) {
  var notification = new Notification();
  notification.customerId = req.order.customerId;
  notification.tme = new Date();
  notification.type = config.enums.NOTIFICATION_TYPES.delivered;
  notification.message = 'Delivery confirmation for order[' +
      req.order.getOrderDisplayNumber(config.orderPrefix) + ']. Please share feedbacks.';
  notification.summary = 'We are pleased to inform that the items in your order ' +
      req.order.getOrderDisplayNumber(config.orderPrefix) + ' have been delivered.' +
      'This completes your order. Thank you for shopping!';
  notification.save(function(err, notify) {
    if (err) { handleError(res, err); }
    next();
  });
};

// update read flag of notifications
exports.updateReadStatus = function(req, res, next) {
  if (!req.result) { return res.send(404); }
  var notificationIds = [];
  _.forEach(req.result.data, function(notification) {
    if (!notification.read) {
      notificationIds.push(notification._id);
    }
  });
  if (notificationIds && notificationIds.length > 0) {
    Notification.update({ // condition
      '_id': {
        '$in': notificationIds
      }
    },
    { // update fields
      read: true
    },
    { // options
      multi: true
    }, function(err, notifications) { // callback
      if (err) { handleError(res, err); }
      return res.send(200, req.result);
    });
  } else {
    return res.send(200, req.result);
  }
};

// add notification record for change password event.
exports.notifyChangePassword = function(req, res, next) {
  var success = req.success;
  var notification = new Notification();
  notification.customerId = req.user._id;
  notification.tme = new Date();
  notification.type = config.enums.NOTIFICATION_TYPES.user;
  if (success) {
    notification.message = 'Password Change - Success';
    notification.summary = 'You have successfully changed your password.';
  } else {
    notification.message = 'Password Change - Fail';
    notification.summary = 'You tried to change your password but failed to do so. ' +
      'If it was not you then please report to us.';
  }
  notification.isSuccess = success;
  notification.save(function(err, notify) {
    if (err) { handleError(res, err); }
    if (success) { return res.send(200); }
    else { return res.json(req.code, req.err); }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Paymentmethods = require('./paymentMethods.model');

exports.register = function(socket) {
  Paymentmethods.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Paymentmethods.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('paymentMethods:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('paymentMethods:remove', doc);
}
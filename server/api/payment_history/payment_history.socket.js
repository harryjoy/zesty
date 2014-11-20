/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PaymentHistory = require('./payment_history.model');

exports.register = function(socket) {
  PaymentHistory.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PaymentHistory.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('payment_history:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('payment_history:remove', doc);
}
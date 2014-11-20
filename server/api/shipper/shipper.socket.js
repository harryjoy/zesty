/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Shipper = require('./shipper.model');

exports.register = function(socket) {
  Shipper.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Shipper.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('shipper:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('shipper:remove', doc);
}
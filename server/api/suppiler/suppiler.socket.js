/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Suppiler = require('./suppiler.model');

exports.register = function(socket) {
  Suppiler.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Suppiler.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('suppiler:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('suppiler:remove', doc);
}
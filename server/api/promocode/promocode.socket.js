/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Promocode = require('./promocode.model');

exports.register = function(socket) {
  Promocode.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Promocode.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('promocode:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('promocode:remove', doc);
}
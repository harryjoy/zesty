/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ItemDetails = require('./item_details.model');

exports.register = function(socket) {
  ItemDetails.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ItemDetails.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('item_details:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('item_details:remove', doc);
}
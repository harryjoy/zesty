/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Reviews = require('./reviews.model');

exports.register = function(socket) {
  Reviews.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Reviews.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('reviews:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('reviews:remove', doc);
}
/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Reviewvote = require('./reviewVote.model');

exports.register = function(socket) {
  Reviewvote.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Reviewvote.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('reviewVote:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('reviewVote:remove', doc);
}
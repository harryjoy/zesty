'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    timestamps = require('mongoose-timestamp');

var ReviewvoteSchema = new Schema({
  vote: Number, // 1 - for helpful, 2 - for not helpful, 3 - for abuse
  customerId: Schema.Types.ObjectId,
  reviewId: Schema.Types.ObjectId
});

ReviewvoteSchema.plugin(timestamps);

module.exports = mongoose.model('Reviewvote', ReviewvoteSchema);
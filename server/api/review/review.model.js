'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  name: String,
  review: String,
  rating: Number,
  customerId: Schema.Types.ObjectId,
  productId: Schema.Types.ObjectId,
  emailId: String,
  place: String,
  reviewTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    timestamps = require('mongoose-timestamp');

var ReviewSchema = new Schema({
	title: String,
  name: String,
  review: String,
  rating: Number,
  customerId: Schema.Types.ObjectId,
  productId: Schema.Types.ObjectId,
  emailId: String,
  place: String,
  certified: {
    type: Boolean,
    default: false
  },
  first: {
    type: Boolean,
    default: false
  },
  product: {
    title: String,
    description: String,
    image: String
  },
  helpful: {
    type: Number,
    default: 0
  },
  unhelpful: {
    type: Number,
    default: 0
  },
  reviewTime: { type: Date, default: Date.now }
});
ReviewSchema.plugin(timestamps);
module.exports = mongoose.model('Review', ReviewSchema);
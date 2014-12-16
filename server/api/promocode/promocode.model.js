'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var PromocodeSchema = new Schema({
  code: String,
  info: String,
  value: Number,
  expiry: {
    type: Date,
    default: new Date()
  },
  isPercent: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: 'ALL'
  }
});

PromocodeSchema.plugin(timestamps);

module.exports = mongoose.model('Promocode', PromocodeSchema);
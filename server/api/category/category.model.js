'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var CategorySchema = new Schema({
  name: String,
  info: String,
  image: String,
  isIcon: {
    type: Boolean,
    default: true
  },
  slug: String,
  active: Boolean
});

CategorySchema.plugin(timestamps);

module.exports = mongoose.model('Category', CategorySchema);
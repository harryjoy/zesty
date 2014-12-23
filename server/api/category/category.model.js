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
    default: false
  },
  slug: String,
  active: Boolean
});

CategorySchema.plugin(timestamps);

// to return virtual fields in response.
CategorySchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret, options) { // we can add extra fields in here
    ret.productCount = doc.productCount;
  }
});

module.exports = mongoose.model('Category', CategorySchema);
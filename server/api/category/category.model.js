'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  info: String,
  image: String,
  isIcon: {
    type: Boolean,
    default: true
  },
  active: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);
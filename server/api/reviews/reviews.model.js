'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Reviews', ReviewsSchema);
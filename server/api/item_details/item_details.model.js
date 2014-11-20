'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemDetailsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('ItemDetails', ItemDetailsSchema);
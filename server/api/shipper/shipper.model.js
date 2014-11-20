'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShipperSchema = new Schema({
  companyName: String,
  info: String,
  phone: String,
  email: String,
  address: String,
  active: Boolean
});

module.exports = mongoose.model('Shipper', ShipperSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  cardDetails: [{
	  paymentMethodName: String,
    cardNo: Number,
    expiryDate: String // Month/Year
  }]
});

module.exports = mongoose.model('Customer', CustomerSchema);
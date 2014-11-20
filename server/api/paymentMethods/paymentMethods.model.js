'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentmethodsSchema = new Schema({
  name: String,
  code: Number,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Paymentmethods', PaymentmethodsSchema);
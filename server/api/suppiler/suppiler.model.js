'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SuppilerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  companyName: String,
  contactFname: String,
  contactLname: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  phone: String,
  email: String,
  logo: String,
  customerId: Schema.Types.ObjectId
});

module.exports = mongoose.model('Suppiler', SuppilerSchema);
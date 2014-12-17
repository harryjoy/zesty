'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
	_id: Schema.Types.ObjectId,
  title: String,
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  country: String,
  zipcode: String,
  isDefault: {
    type: Boolean,
    default: false
  }
});

module.exports = AddressSchema;
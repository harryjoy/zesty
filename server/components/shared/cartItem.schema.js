'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  qty: Number,
  price: Number,
  title: String,
  img: String,
  description: String,
  currency: String,
  categories: [{
    id: Schema.Types.ObjectId,
    name: String
  }],
  approxDeliveryDate: Date,
  deliveryDate: Date,
  shipper:{
    shipperId: Schema.Types.ObjectId,
    companyName: String,
    phone: String,
    email: String
  },
  supplier: {
    _id: Schema.Types.ObjectId,
    name: String
  },

  productType: Number,
  specialPrice: Number,
  isSpecialDiscount: {type: Boolean, default: false},
  specialPriceStartDate: Date,
  specialPriceEndDate: Date,
  isSpecialScheduled: {type: Boolean, default: false}
});

module.exports = CartItemSchema;
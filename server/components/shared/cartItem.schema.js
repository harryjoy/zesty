'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  }
});

module.exports = CartItemSchema;
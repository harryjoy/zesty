'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var OrderSchema = new Schema({
  orderNumber: String,
  products: [{
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
    shipper: {
      shipperId: Schema.Types.ObjectId,
      companyName: String,
      phone: String,
      email: String
    },
    supplier: {
      _id: Schema.Types.ObjectId,
      name: String
    }
  }],
  orderDate: {
    type: Date,
    default: new Date()
  },
  subTotal: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    default: 0
  },
  promoCode: String,
  promoCodeValue: Number,
  promoCodeInfo: String,
  currency: String,

  paymentId: Schema.Types.ObjectId,
  paymentMethod: String, // CC - credit cart, DC - debit card, COD - cashh on delivery, NB - net banking
  paymentDate: Date,
  transcationStatus: Number,
  transcationSuccess: Boolean,
  errLoc: String,
  errMsg: String,
  processed: {
    type: Boolean,
    default: false
  },

  customerId: Schema.Types.ObjectId,
  customerOrderNumber: String,
  address: {
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
    zipcode: String
  },
  extraNotes: String
});

OrderSchema.plugin(timestamps);

module.exports = mongoose.model('Order', OrderSchema);
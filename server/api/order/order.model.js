'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  orderNumber: Number,
  quantity: Number,
  orderDate: Number,

  paymentId: Schema.Types.ObjectId,
  paid: String,
  paymentDate: Number,
  transcationStatus: Number,
  transcationSuccess: Boolean,
  errLoc: String,
  errMsg: String,

  customerId: Schema.Types.ObjectId,
  customerOrderNumber: Number,

  approxShipDate: Number,
  shipDate: Number,
  shipper:{
    shipperId: Schema.Types.ObjectId,
    companyName: String,
    phone: String,
    email: String
  }
});

module.exports = mongoose.model('Order', OrderSchema);
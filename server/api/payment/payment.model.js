'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  productId: Schema.Types.ObjectId,
  orderId: Schema.Types.ObjectId,
	paymentMethodCode: Number,
  paymentStatus: {
        statusCode: Number,
        statusDesc: String
  },
  paymentDate: Date,
  amount: Number
});

module.exports = mongoose.model('Payment', PaymentSchema);
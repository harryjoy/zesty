'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var PaymentSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  orderId: Schema.Types.ObjectId,
	paymentMethodCode: Number,
  paymentStatus: {
    statusCode: Number,
    statusDesc: String
  },
  paymentDate: Date,
  amount: Number,
  currency: String
});

PaymentSchema.plugin(timestamps);

module.exports = mongoose.model('Payment', PaymentSchema);
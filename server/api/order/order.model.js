'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp'),
    CartItemSchema = require('../../components/shared/cartItem.schema');

var OrderSchema = new Schema({
  orderNumber: String,
  products: [CartItemSchema],
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

OrderSchema.methods = {
  /**
   * Get order number to be displayed on UI.
   * @param  {String} orderPrefix Prefix to add to order number.
   */
  getOrderDisplayNumber: function(orderPrefix) {
    if (!this.orderNumber || this.orderNumber.indexOf('-') === -1) {
      return this.orderNumber;
    }
    return orderPrefix + '' + this.orderNumber.substring(this.orderNumber.lastIndexOf('-') + 1);
  }
};

module.exports = mongoose.model('Order', OrderSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var CartSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  products: [{
    _id: Schema.Types.ObjectId,
    qty: Number,
    price: Number,
    title: String,
    img: String,
    description: String,
    currency: String,
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
  }],
  subTotal: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    default: 0
  },
  promoCode: String,
  promoCodeValue: Number
});

CartSchema.plugin(timestamps);

module.exports = mongoose.model('Cart', CartSchema);
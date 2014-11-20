'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  products: [{
    id: String,
    qty: Number,
    price: Number,
    name: String,
    img: String,
    approxDeliveryDate: Date,
	  deliveryDate: Date,
	  shipper:{
	    shipperId: Schema.Types.ObjectId,
	    companyName: String,
	    phone: String,
	    email: String
	  },
	  supplier: {
      id: Schema.Types.ObjectId,
      name: String
	  }
  }],
  grandTotal: Number,
  promoCode: String,
  promoCodeValue: Number
});

module.exports = mongoose.model('Cart', CartSchema);
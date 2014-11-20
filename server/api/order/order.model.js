'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  orderNumber: Number,
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
  orderDate: Number,

  paymentId: Schema.Types.ObjectId,
  paid: String,
  paymentDate: Number,
  transcationStatus: Number,
  transcationSuccess: Boolean,
  errLoc: String,
  errMsg: String,

  customerId: Schema.Types.ObjectId,
  customerOrderNumber: Number
});

module.exports = mongoose.model('Order', OrderSchema);
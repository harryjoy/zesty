'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  title: String,
  description: String,
  active: Boolean,
  summary: String,
  price: { type: Number, min: 0 },
  currency: String,
  mainImage: String,
  images: [String],
  tags: [String],
  updated: { type: Date, default: Date.now },
  rating: Number,

  categories: [{
    id: Schema.Types.ObjectId,
    name: String
  }],

  extraFields: [{
    name: String,
    values: [String],
    type: Number
  }],
  
  suppliers: [{
    id: Schema.Types.ObjectId,
    name: String,
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 },
    shiping_time: String,
    discount: Number,
    discountUnit: String,
    offer: String
  }]
});

module.exports = mongoose.model('Item', ItemSchema);
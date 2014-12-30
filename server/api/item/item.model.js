'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    timestamps = require('mongoose-timestamp');

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
  rating: Number,
  reviews: {
    type: Number,
    default: 0
  },

  slug: String,
  productType: {
    type: Number,
    default: 1 
  },
  searchable: {
    type: Boolean,
    default: true
  },
  reviewEnabled: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },

  specialPrice: { type: Number, min: 0 },
  isSpecialDiscount: Boolean,
  specialPriceStartDate: Date,
  specialPriceEndDate: Date,

  attrs: [{
    name: String,
    values: String,
  }],
  upsells: [{
    id: Schema.Types.ObjectId,
    title: String
  }],
  crosssells: [{
    id: Schema.Types.ObjectId,
    title: String
  }],
  files: {
    items: [String],
    limits: {
      type: Number,
      default: -1
    },
    expiration: {
      type: Number,
      default: -1
    }
  },

  categories: [{
    id: Schema.Types.ObjectId,
    name: String
  }],

  extraFields: [{
    name: String,
    values: [String]
  }],
  
  suppliers: [{
    id: Schema.Types.ObjectId,
    name: String,
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 },
    shippingTime: String,
    discount: Number,
    discountUnit: String,
    offer: String
  }]
});

ItemSchema.plugin(timestamps);

module.exports = mongoose.model('Item', ItemSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var PromocodeSchema = new Schema({
  code: String,
  info: String,
  value: Number,
  expiry: {
    type: Date,
    default: new Date()
  },
  isSpecific: {
    type: Boolean,
    default: false
  },
  isPercent: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  categories: [String]
});

PromocodeSchema.plugin(timestamps);

// Validate promo code is not in use.
PromocodeSchema.path('code').validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({code: value}, function(err, promocode) {
    if(err) throw err;
    if(promocode) {
      if(self.id === promocode.id) return respond(true);
      return respond(false);
    }
    respond(true);
  });
}, 'The specified promo code is already in use.');

module.exports = mongoose.model('Promocode', PromocodeSchema);

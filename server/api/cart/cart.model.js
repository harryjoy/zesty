'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var CartItemSchema = require('../../components/shared/cartItem.schema');
var _ = require('lodash');

var CartSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  products: [CartItemSchema],
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
  promoCodeExpiry: Date,
  isPromoCodeSpecific: Boolean,
  promoCodeCategories: [String],
  isPromoCodePercentage: Boolean,
  promoCodeActualValue: Number,
  currency: String
});

CartSchema.plugin(timestamps);

/**
 * Methods
 */
CartSchema.methods = {
  /**
   * Remove promo code and related entries from cart.
   */
  invalidatePromoCode: function() {
    this.promoCode = undefined;
    this.promoCodeValue = undefined;
    this.promoCodeInfo = undefined;
    this.promoCodeExpiry = undefined;
    this.isPromoCodeSpecific = undefined;
    this.promoCodeCategories = undefined;
    this.isPromoCodePercentage = undefined;
    this.promoCodeActualValue = undefined;
  },

  /**
   * Add promo code and update related values.
   * @param  {Object} pc Promo code to be applied to cart.
   */
  applyPromoCode: function(pc) {
    this.promoCode = pc.code;
    this.promoCodeInfo = pc.info;
    this.promoCodeExpiry = pc.expiry;
    this.isPromoCodeSpecific = pc.isSpecific;
    this.promoCodeCategories = pc.categories;
    this.isPromoCodePercentage = pc.isPercent;
    this.promoCodeActualValue = pc.value;
    if (pc.isPercent) {
      this.promoCodeValue = (this.grandTotal * pc.value) / 100;
    } else {
      this.promoCodeValue = pc.value;
    }
  },

  /**
   * Calculate and return cart's grand total.
   * @return {Numner}      Grand total for the cart.
   */
  calculateCartTotal: function() {
    var grandTotal = 0;
    if (this.products && this.products.length > 0) {
      _.forEach(this.products, function(product) {
        grandTotal = grandTotal + (product.qty * product.price);
      });
    }
    return grandTotal;
  },

  /**
   * calculate cart values before updating cart.
   */
  calculateCartValues: function() {
    var self = this;
    self.subTotal = 0;
    self.grandTotal = 0;
    self.currency = '';
    if (self.products && self.products.length > 0) {
      _.forEach(self.products, function(product) {
        self.subTotal = self.subTotal + (product.qty * product.price);
        self.grandTotal = self.grandTotal + (product.qty * product.price);
        self.currency = product.currency;
      });
      self.currency = self.products[0].currency;
      if (self.promoCodeValue) {
        if (self.grandTotal > self.promoCodeValue) {
          self.grandTotal = self.grandTotal - self.promoCodeValue;
        } else{
          self.grandTotal = 0;
        }
      }
    }
  }
};

module.exports = mongoose.model('Cart', CartSchema);
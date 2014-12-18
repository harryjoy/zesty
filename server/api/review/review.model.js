'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    timestamps = require('mongoose-timestamp'),
    config = require('../../config/environment');

var ReviewSchema = new Schema({
	title: String,
  name: String,
  review: String,
  rating: Number,
  customerId: Schema.Types.ObjectId,
  productId: Schema.Types.ObjectId,
  emailId: String,
  place: String,
  certified: {
    type: Boolean,
    default: false
  },
  first: {
    type: Boolean,
    default: false
  },
  product: {
    title: String,
    description: String,
    image: String
  },
  helpful: {
    type: Number,
    default: 0
  },
  unhelpful: {
    type: Number,
    default: 0
  },
  abuses: {
    type: Number,
    default: 0
  },
  reviewTime: { type: Date, default: Date.now }
});

ReviewSchema.plugin(timestamps);

/**
 * Methods
 */
ReviewSchema.methods = {
  /**
   * Increament respective count of flag based on review vote.
   * @param {[type]} vote [description]
   */
  addReviewVote: function(vote) {
    if (vote === config.enums.REVIEW_VOTE_TYPE.helpful) {
      this.helpful = this.helpful + 1;
    } else if (vote === config.enums.REVIEW_VOTE_TYPE.unhelpful) {
      this.unhelpful = this.unhelpful + 1;
    } else if (vote === config.enums.REVIEW_VOTE_TYPE.abuse) {
      this.abuses = this.abuses + 1;
    }
  },

  /**
   * Set product information in review.
   * @param {Object} item Product
   */
  setProduct: function(item) {
    this.product = {
      title: item.title,
      description: item.description,
      image: item.mainImage
    };
  }
};

/**
 * Pre-save hook:
 *   Check if rating is in valid range 
 *   and if review is coming from a certified buyer or not.
 */
ReviewSchema.pre('save', function(next) {
  if (!this.isNew) { return next(); }
  if (this.customerId) {
    this.certified = true;
  }
  if (this.rating > 5) {
    this.rating = 5;
  }
  next();
});

module.exports = mongoose.model('Review', ReviewSchema);

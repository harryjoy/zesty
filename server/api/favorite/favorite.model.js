'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var FavoriteSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  productId: Schema.Types.ObjectId
});

FavoriteSchema.plugin(timestamps);

module.exports = mongoose.model('Favorite', FavoriteSchema);
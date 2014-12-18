'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var moment = require('moment');

var NotificationSchema = new Schema({
  customerId: Schema.Types.ObjectId,
  message: String,
  summary: String,
  type: Number, // config.enums.NOTIFICATION_TYPES
  tme: Date,
  isSuccess: { // whether this notification is of success event or not
    type: Boolean,
    default: true
  },
  read: { // whether user has read the notification or not.
    type: Boolean,
    default: false
  }
});

NotificationSchema.plugin(timestamps);

// Virtuals
NotificationSchema.virtual('displayTime').get(function() {
  return moment(this.tme).fromNow();
});
// to return virtual fields in response.
NotificationSchema.set('toJSON', { virtuals: true });

/**
 * Methhods
 */
NotificationSchema.methods = {
  /**
   * Get display time in 'xx yyy ago' format.
   */
  getDisplayTime: function() {
    return moment(this.tme).fromNow();
  }
};

module.exports = mongoose.model('Notification', NotificationSchema);
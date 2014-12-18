'use strict';

/**
 * This file used to store error, warning and success messages.
 * This messages will be used as response status messages for specific conditions.
 */
module.exports = {
  errors: {
    CART_PRICE_LIMIT_EXCEED: 'Cart total exceeds your \'In a Cart\' limit.',
    CART_ITEMS_LIMIT_EXCEED: 'Items in cart exceeds your \'In a Cart\' items limit.',

    MONTHLY_PRICE_LIMIT_EXCEED: 'Cart total exceeds your \'Monthly\' limit.',
    MONTHLY_ITEMS_LIMIT_EXCEED: 'Items in cart exceeds your \'Monthly\' items limit.',

    YEARLY_PRICE_LIMIT_EXCEED: 'Cart total exceeds your \'Yearly\' limit.',
    YEARLY_ITEMS_LIMIT_EXCEED: 'Items in cart exceeds your \'Yearly\' items limit.',

    INVALID_PROMO_CODE: 'Entered promo code is not valid.',
    PROMO_CODE_NOT_FOUND: 'Entered promo code not found.',
    PROMO_CODE_CATEGORY_NOT_VALID: 'Entered promocode is not valid for current cart items.'
  },

  warning: {
  },

  success: {
  }
};

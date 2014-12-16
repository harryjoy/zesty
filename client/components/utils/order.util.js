'use strict';

angular.module('zesty.utils')
  .factory('OrderUtil', [function () {
  return {
    getOrderFromCart: function (cart, orderPrefix) {
      return {
        customerOrderNumber: cart.customerId + '-' + new Date().getTime(),
        orderNumber: orderPrefix + '-' + cart.customerId + '-' + new Date().getTime(),
        customerId: cart.customerId,
        products: cart.products,
        grandTotal: cart.grandTotal,
        subTotal: cart.subTotal,
        shippingCharge: cart.shipping,
        promoCode: cart.promoCode,
        promoCodeValue: cart.promoCodeValue,
        currency: cart.currency
      };
    },
    updateOrderFromCart: function (cart, orderPrefix, order) {
      order.customerOrderNumber = cart.customerId + '-' + new Date().getTime();
      order.orderNumber = orderPrefix + '-' + cart.customerId + '-' + new Date().getTime();
      order.customerId = cart.customerId;
      order.products = cart.products;
      order.grandTotal = cart.grandTotal;
      order.subTotal = cart.subTotal;
      order.shippingCharge = cart.shipping;
      order.promoCode = cart.promoCode;
      order.promoCodeValue = cart.promoCodeValue;
      order.currency = cart.currency;
      return order;
    }
  };
}]);
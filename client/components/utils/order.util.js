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
        promoCodeInfo: cart.promoCodeInfo,
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
      order.promoCodeInfo = cart.promoCodeInfo;
      order.currency = cart.currency;
      return order;
    },
    convertOrderForInvoice: function (order, siteName, fromAddress, invoiceNumber, orderNumber, orderDate, paymentDate) {
      return {
        from: fromAddress,
        to: order.address,
        invoiceNumber: invoiceNumber,
        id: orderNumber,
        date: orderDate,
        paymentDate: paymentDate,
        paymentMethod: order.paymentMethod ? order.paymentMethod : '-',
        items: order.products,
        promoCode: order.promoCode,
        promoCodeValue: order.promoCodeValue,
        promoCodeInfo: order.promoCodeInfo,
        subTotal: order.subTotal,
        tax: order.tax ? order.tax : 0,
        shipping: order.shippingCharge ? order.shippingCharge : 0,
        grandTotal: order.grandTotal,
        siteName: siteName,
        currency: order.currency
      };
    }
  };
}]);

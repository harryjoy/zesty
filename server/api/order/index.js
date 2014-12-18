'use strict';

var express = require('express');
var controller = require('./order.controller');
var cartController = require('../cart/cart.controller');
var notificationController = require('../notification/notification.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);

router.get('/by/customer', auth.isAuthenticated(), controller.getOrderByCustomer);
router.post('/:id/payment', controller.updatePaymentInfo, notificationController.notifyOrderPlaced,
	notificationController.notifyOrderShipped, cartController.emptyCart);

module.exports = router;

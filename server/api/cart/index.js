'use strict';

var express = require('express');
var controller = require('./cart.controller');
var promocodeController = require('../promocode/promocode.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.put('/:id', controller.update);
router.patch('/:id', controller.update);

router.get('/:id/items', controller.getCartItems);
router.post('/:id/items', controller.addToCart);
router.delete('/:id/items', controller.removeFromCart);

router.get('/:id/promocode', controller.checkPromoCode);
router.post('/:id/promocode', promocodeController.check, controller.applyPromoCode);
router.delete('/:id/promocode', controller.removePromoCode);

router.get('/:id/checklimits', auth.isAuthenticated(), controller.checkCartLimits,
	controller.checkCartMonthlyLimits, controller.checkCartYearlyLimits);

module.exports = router;
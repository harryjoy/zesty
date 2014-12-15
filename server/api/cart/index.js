'use strict';

var express = require('express');
var controller = require('./cart.controller');

var router = express.Router();

router.put('/:id', controller.update);
router.patch('/:id', controller.update);

router.get('/:id/items', controller.getCartItems);
router.post('/:id/items', controller.addToCart);
router.delete('/:id/items', controller.removeFromCart);

module.exports = router;
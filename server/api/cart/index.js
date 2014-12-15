'use strict';

var express = require('express');
var controller = require('./cart.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:id/items', controller.getCartItems);
router.post('/:id/items', controller.addToCart);
router.delete('/:id/items', controller.removeFromCart);

module.exports = router;
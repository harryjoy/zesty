'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

router.post('/:id/addresses', auth.isAuthenticated(), controller.addAddress);
router.put('/:id/addresses', auth.isAuthenticated(), controller.editAddress);
router.delete('/:id/addresses/:adderssId', auth.isAuthenticated(), controller.deleteAddress);
router.put('/:id/addresses/:adderssId/default', auth.isAuthenticated(), controller.makeAddressDefault);

router.post('/:id/cards', auth.isAuthenticated(), controller.addCard);
router.put('/:id/cards', auth.isAuthenticated(), controller.editCard);
router.delete('/:id/cards/:cardId', auth.isAuthenticated(), controller.deleteCard);

router.get('/:id/reviews', auth.isAuthenticated(), controller.reviews);
router.get('/:id/ratings', auth.isAuthenticated(), controller.ratings);

router.get('/:id/favorites', auth.isAuthenticated(), controller.favorites);

module.exports = router;

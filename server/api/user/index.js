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

module.exports = router;

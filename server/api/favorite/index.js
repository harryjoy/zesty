'use strict';

var express = require('express');
var controller = require('./favorite.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/check-for-fav', auth.isAuthenticated(), controller.checkForFav);
router.get('/check-for-product-fav', auth.isAuthenticated(), controller.checkForProductFav);

module.exports = router;
'use strict';

var express = require('express');
var controller = require('./favorite.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/checkForFav', auth.isAuthenticated(), controller.checkForFav);

module.exports = router;
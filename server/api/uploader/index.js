'use strict';

var express = require('express');
var controller = require('./uploader.controller');

var router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);

module.exports = router;
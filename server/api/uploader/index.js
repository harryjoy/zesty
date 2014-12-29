'use strict';

var express = require('express');
var controller = require('./uploader.controller');

var router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);

router.get('/file', controller.listFile);
router.post('/file', controller.createFile);

module.exports = router;
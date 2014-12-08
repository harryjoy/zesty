'use strict';

var express = require('express');
var controller = require('./item.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:id/reviews', controller.reviews);
router.post('/:id/reviews', controller.addReview);
router.get('/:id/related', controller.related);
router.get('/:id/ratings', controller.ratings);

module.exports = router;
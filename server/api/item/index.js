'use strict';

var express = require('express');
var controller = require('./item.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);
router.get('/featured', controller.featured);
router.get('/counts', controller.counts);
router.delete('/detele-mutiple', auth.hasRole('admin'), controller.destroyMultiple);
router.post('/recover-mutiple', auth.hasRole('admin'), controller.recoverMultiple);
router.post('/publish-mutiple', auth.hasRole('admin'), controller.publishMultiple);

router.get('/:id', controller.getItem, controller.show);
router.post('/', controller.create);
router.put('/:id', controller.getItem, controller.update);
router.patch('/:id', controller.getItem, controller.update);
router.delete('/:id', controller.getItem, controller.destroy);

router.get('/:id/reviews', controller.reviews);
router.post('/:id/reviews', controller.getItem, controller.addReview, controller.updateItemRatings);
router.put('/:id/reviews', controller.getItem, controller.editReview, controller.updateItemRatings);

router.get('/:id/related', controller.getItem, controller.related);
router.get('/:id/ratings', controller.ratings);

router.post('/:id/favorite', auth.isAuthenticated(), controller.getItem, controller.addToFavorite);
router.delete('/:id/favorite', auth.isAuthenticated(), controller.removeFavorite);

router.post('/:id/recover', auth.hasRole('admin'), controller.getItem, controller.updateDeletedFlag);
router.delete('/:id/delete', auth.hasRole('admin'), controller.getItem, controller.updateDeletedFlag);

module.exports = router;

'use strict';

var Favorite = require('./favorite.model');

// check if user has this product in his favorite
exports.checkForFav = function(req, res, next) {
  Favorite.findOne({
    customerId: req.user._id,
    productId: req.query.productId
  }, function (err, favorite) {
    if(err) { return handleError(res, err); }
    if(!favorite) { return res.send(404); }
    return res.json(favorite);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
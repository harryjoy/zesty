/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Category = require('../api/category/category.model');
var Item = require('../api/item/item.model');
var User = require('../api/user/user.model');

Category.find({}).remove(function() {
  Category.create({
    name: 'Men',
    info: 'Category for men items.',
    active: true
  }, {
    name: 'Women',
    info: 'Category for women items.',
    active: true
  });
});

Item.find({}).remove(function() {
  Category.find({ name: 'Men' }).exec(function(err, category){
    Item.create({
      title : 'Item 1',
      price : '649',
      currency: 'Rs',
      categories: [{
        _id: category[0]._id,
        name: category[0].name
      }],
      active: true,
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/750x400',
      images: ['http://placehold.it/750x400', 'http://placehold.it/750x410',
                    'http://placehold.it/750x420', 'http://placehold.it/750x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    }, {
      title : 'Item 0',
      price : '949',
      currency: 'Rs',
      active: false,
      categories: [{
        _id: category[0]._id,
        name: category[0].name
      }],
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/750x400',
      images: ['http://placehold.it/750x400', 'http://placehold.it/750x410',
                    'http://placehold.it/750x420', 'http://placehold.it/750x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    });
  });
  Category.find({ name: 'Men' }).exec(function(err, category){
    Item.create({
      title : 'Item 2',
      price : '249',
      currency: 'Rs',
      active: true,
      categories: [{
        _id: category[0]._id,
        name: category[0].name
      }],
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/750x400',
      images: ['http://placehold.it/750x400', 'http://placehold.it/750x410',
                    'http://placehold.it/750x420', 'http://placehold.it/750x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    },  {
      title : 'Item 3',
      price : '349',
      active: true,
      categories: [{
        _id: category[0]._id,
        name: category[0].name
      }],
      currency: 'Rs',
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/750x400',
      images: ['http://placehold.it/750x400', 'http://placehold.it/750x410',
                    'http://placehold.it/750x420', 'http://placehold.it/750x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    },  {
      title : 'Item 4',
      price : '449',
      active: true,
      categories: [{
        _id: category[0]._id,
        name: category[0].name
      }],
      currency: 'Rs',
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/750x400',
      images: ['http://placehold.it/750x400', 'http://placehold.it/750x410',
                    'http://placehold.it/750x420', 'http://placehold.it/750x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    },{
      title : 'Item 5',
      price : '549',
      active: true,
      categories: [{
        _id: category[0]._id,
        name: category[0].name
      }],
      currency: 'Rs',
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/750x400',
      images: ['http://placehold.it/750x400', 'http://placehold.it/750x410',
                    'http://placehold.it/750x420', 'http://placehold.it/750x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    });
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
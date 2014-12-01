/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Category = require('../api/category/category.model');
var Item = require('../api/item/item.model');
var Review = require('../api/review/review.model');
var User = require('../api/user/user.model');
var Suppiler = require('../api/suppiler/suppiler.model');
var moment = require('moment')

Category.find({}).remove(function() {
  Category.create({
    name: 'Apparel & Accessories',
    info: 'Category for Apparel & Accessories items.',
    active: true
  }, {
    name: 'Baby Products',
    info: 'Category for Baby Products items.',
    active: true
  }, {
    name: 'Beauty & Health',
    info: 'Category for Beauty & Health items.',
    active: true
  }, {
    name: 'Electronics',
    info: 'Category for Electronics items.',
    active: true
  }, {
    name: 'Furniture',
    info: 'Category for Furniture items.',
    active: true
  }, {
    name: 'Home & Garden',
    info: 'Category for Home & Garden items.',
    active: true
  }, {
    name: 'Luggage & Bags',
    info: 'Category for Luggage & Bags items.',
    active: true
  }, {
    name: 'Shoes',
    info: 'Category for Shoes items.',
    active: true
  }, {
    name: 'Sports & Entertainment',
    info: 'Category for Sports & Entertainment items.',
    active: true
  }, {
    name: 'Watches',
    info: 'Category for Watches items.',
    active: true
  });
});

Suppiler.find({}).remove(function() {
  Suppiler.create({
    name: 'Suppiler 1',
    info: 'Information about first supplier.',
    active: true,
    companyName: 'Suppiler 1 Company Inc.',
    contactFname: 'First',
    contactLname: 'Suppiler',
    address1: 'Prahladnagar Garden',
    address2: '100 Ft. Cross Road',
    city: 'Ahmedabad',
    state: 'Gujarat',
    postalCode: '380015',
    country: 'India',
    phone: '(+91) 999-xx-x-xx-xx',
    email: 'supplier1@zesty.com',
    logo: 'http://placehold.it/400x410',
  }, {
    name: 'Suppiler 2',
    info: 'Information about second supplier.',
    active: true,
    companyName: 'Suppiler 2 Company Inc.',
    contactFname: 'Second',
    contactLname: 'Suppiler',
    address1: 'Gota',
    address2: 'V. Icon',
    city: 'Ahmedabad',
    state: 'Gujarat',
    postalCode: '380015',
    country: 'India',
    phone: '(+91) 999-xx-x-xx-xx',
    email: 'supplier2@zesty.com',
    logo: 'http://placehold.it/400x420',
  }, {
    name: 'Suppiler 3',
    info: 'Information about third supplier.',
    active: true,
    companyName: 'Suppiler 3 Company Inc.',
    contactFname: 'Third',
    contactLname: 'Suppiler',
    address1: 'Vasna',
    address2: 'River front',
    city: 'Ahmedabad',
    state: 'Gujarat',
    postalCode: '380015',
    country: 'India',
    phone: '(+91) 999-xx-x-xx-xx',
    email: 'supplier3@zesty.com',
    logo: 'http://placehold.it/400x430',
  });
});

Item.find({}).remove(function() {
  Category.findOne({ name: 'Furniture' }).exec(function(err, category) {
    Suppiler.findOne({ name: 'Suppiler 1' }).exec(function(err, supplier1) {
      Suppiler.findOne({ name: 'Suppiler 2' }).exec(function(err, supplier2) {
        Item.create({
          title : 'Item 1',
          price : '649',
          currency: 'Rs',
          categories: [{
            _id: category._id,
            name: category.name
          }],
          active: true,
          rating: 2,
          reviews: 2,
          suppliers: [{
            id: supplier1._id,
            name: supplier1.name,
            price: 649,
            qty: 10,
            shippingTime: '3d',
          }, {
            id: supplier2._id,
            name: supplier2.name,
            price: 649,
            qty: 50,
            shippingTime: '5d',
          }],
          description : 'This item is very good and can give you a good return.',
          mainImage : 'http://placehold.it/400x400',
          images: ['http://placehold.it/400x400', 'http://placehold.it/400x410',
                        'http://placehold.it/400x420', 'http://placehold.it/400x430'],
          summary : 'This item is very good and can give you a good return.' + 
                    ' This is the summary of that item so it needs to be long and ' + 
                    'so I am adding radom stuff in it. This summary actually does not ' + 
                    'have any meaning so dont spend your time in reading it.' + 
                    'This item is very good and can give you a good return.' + 
                    ' This is the summary of that item so it needs to be long and ' + 
                    'so I am adding radom stuff in it. This summary actually does not ' + 
                    'have any meaning so dont spend your time in reading it.' + 
                    'This item is very good and can give you a good return.' + 
                    ' This is the summary of that item so it needs to be long and ' + 
                    'so I am adding radom stuff in it. This summary actually does not ' + 
                    'have any meaning so dont spend your time in reading it.' + 
                    'This item is very good and can give you a good return.' + 
                    ' This is the summary of that item so it needs to be long and ' + 
                    'so I am adding radom stuff in it. This summary actually does not ' + 
                    'have any meaning so dont spend your time in reading it.',
        }, {
          title : 'Item 0',
          price : '949',
          currency: 'Rs',
          active: false,
          categories: [{
            _id: category._id,
            name: category.name
          }],
          rating: 0,
          reviews: 0,
          suppliers: [{
            id: supplier1._id,
            name: supplier1.name,
            price: 649,
            qty: 10,
            shippingTime: '3d',
          }, {
            id: supplier2._id,
            name: supplier2.name,
            price: 649,
            qty: 50,
            shippingTime: '5d',
          }],
          description : 'This item is very good and can give you a good return.',
          mainImage : 'http://placehold.it/400x400',
          images: ['http://placehold.it/400x400', 'http://placehold.it/400x410',
                        'http://placehold.it/400x420', 'http://placehold.it/400x430'],
          summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
        }, function () {
          Review.find({}).remove(function () {
            Item.findOne({ title: 'Item 1' }).exec(function(err, items) {
              Review.create({
                name: 'Test User',
                emailId: 'test@test.com',
                review: 'This is good product',
                rating: 2,
                productId: items._id,
                place: 'United States'
              }, {
                name: 'Admin',
                emailId: 'admin@admin.com',
                review: 'This is awesome product',
                rating: 4,
                productId: items._id,
                place: 'India'
              });
            });
          });
        });
      });
      });
    });
    
  Category.findOne({ name: 'Electronics' }).exec(function(err, category){
    Item.create({
      title : 'Item 2',
      price : '249',
      currency: 'Rs',
      active: true,
      categories: [{
        _id: category._id,
        name: category.name
      }],
      rating: 0,
      reviews: 0,
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/400x400',
      images: ['http://placehold.it/400x400', 'http://placehold.it/400x410',
                        'http://placehold.it/400x420', 'http://placehold.it/400x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    },  {
      title : 'Item 3',
      price : '349',
      active: true,
      categories: [{
        _id: category._id,
        name: category.name
      }],
      rating: 0,
      reviews: 0,
      currency: 'Rs',
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/400x400',
      images: ['http://placehold.it/400x400', 'http://placehold.it/400x410',
                        'http://placehold.it/400x420', 'http://placehold.it/400x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    },  {
      title : 'Item 4',
      price : '449',
      active: true,
      categories: [{
        _id: category._id,
        name: category.name
      }],
      rating: 0,
      reviews: 0,
      currency: 'Rs',
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/400x400',
      images: ['http://placehold.it/400x400', 'http://placehold.it/400x410',
                        'http://placehold.it/400x420', 'http://placehold.it/400x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    },{
      title : 'Item 5',
      price : '549',
      active: true,
      categories: [{
        _id: category._id,
        name: category.name
      }],
      rating: 0,
      reviews: 0,
      currency: 'Rs',
      description : 'This item is very good and can give you a good return.',
      mainImage : 'http://placehold.it/400x400',
      images: ['http://placehold.it/400x400', 'http://placehold.it/400x410',
                        'http://placehold.it/400x420', 'http://placehold.it/400x430'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    });
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    mobile: '99xxyyzz00'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    mobile: '99xxyyzz00'
  }, function() {
      console.log('finished populating users');
    }
  );
});
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
          mainImage : 'http://placehold.it/400x400/5cb85c/ffffff&text=Item 1',
          images: ['http://placehold.it/400x400/F56954/ffffff&text=Item 1', 
                      'http://placehold.it/400x400/00A65A/ffffff&text=Item 1',
                      'http://placehold.it/400x400/00C0EF/ffffff&text=Item 1', 
                      'http://placehold.it/400x400/F39C12/ffffff&text=Item 1'],
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
          mainImage : 'http://placehold.it/400x400/428bca/ffffff&text=Item 0',
          images: ['http://placehold.it/400x400/F56954/ffffff&text=Item 0', 
                      'http://placehold.it/400x400/00A65A/ffffff&text=Item 0',
                      'http://placehold.it/400x400/00C0EF/ffffff&text=Item 0', 
                      'http://placehold.it/400x400/F39C12/ffffff&text=Item 0'],
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
                place: 'United States',
                title: 'An Average Product',
                product: {
                  title: items.title,
                  description: items.description,
                  image: items.mainImage
                }
              }, {
                name: 'Admin',
                emailId: 'admin@admin.com',
                review: 'This is awesome product',
                rating: 4,
                productId: items._id,
                place: 'India',
                title: 'Good product',
                product: {
                  title: items.title,
                  description: items.description,
                  image: items.mainImage
                }
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
      mainImage : 'http://placehold.it/400x400/d9534f/ffffff&text=Item 2',
      images: ['http://placehold.it/400x400/F56954/ffffff&text=Item 2', 
                      'http://placehold.it/400x400/00A65A/ffffff&text=Item 2',
                      'http://placehold.it/400x400/00C0EF/ffffff&text=Item 2', 
                      'http://placehold.it/400x400/F39C12/ffffff&text=Item 2'],
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
      mainImage : 'http://placehold.it/400x400/F39C12/ffffff&text=Item 3',
      images: ['http://placehold.it/400x400/F56954/ffffff&text=Item 3', 
                      'http://placehold.it/400x400/00A65A/ffffff&text=Item 3',
                      'http://placehold.it/400x400/00C0EF/ffffff&text=Item 3', 
                      'http://placehold.it/400x400/d9534f/ffffff&text=Item 3'],
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
      mainImage : 'http://placehold.it/400x400/001F3F/ffffff&text=Item 4',
      images: ['http://placehold.it/400x400/F56954/ffffff&text=Item 4', 
                      'http://placehold.it/400x400/00A65A/ffffff&text=Item 4',
                      'http://placehold.it/400x400/00C0EF/ffffff&text=Item 4', 
                      'http://placehold.it/400x400/d9534f/ffffff&text=Item 4'],
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
      mainImage : 'http://placehold.it/400x400/932ab6/ffffff&text=Item 5',
      images: ['http://placehold.it/400x400/F56954/ffffff&text=Item 5', 
                      'http://placehold.it/400x400/00A65A/ffffff&text=Item 5',
                      'http://placehold.it/400x400/00C0EF/ffffff&text=Item 5', 
                      'http://placehold.it/400x400/d9534f/ffffff&text=Item 5'],
      summary : 'This item is very good and can give you a good return. This is the summary of that item so it needs to be long and so I am adding radom stuff in it. This summary actually does not have any meaning so dont spend your time in reading it.',
    });
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'test',
    mobile: '9998989800',
    gender: 'M',
    newsletter: true,
    specialOffers: false,
    addresses: [{
      title: 'Home address',
      firstName: 'Harry',
      lastName: 'Joy',
      email: 'harry@joy.com',
      mobile: '9898989859',
      addressLine1: 'E-603, Vandemataram Icon',
      addressLine2: 'Near Vandemataram Cross Road, Gota',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'IN',
      zipcode: '382461',
      isDefault: true
    },{
      title: 'Company address',
      firstName: 'Harsh',
      lastName: 'Raval',
      email: 'harsh@zymr.com',
      mobile: '9999877059',
      addressLine1: 'A/5, 2nd Floor, Safal Profitier',
      addressLine2: 'Corporate Road, Nr. Prahladnagar Garden',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'IN',
      zipcode: '380015',
      isDefault: false
    }],
    cards: [{
      name: 'Harsh Raval',
      cardNumber: '5432167809873456',
      cardType: 1,
      expiryDate: '10/19',
      label: 'Axis Bank CC'
    }, {
      name: 'Harsh P Raval',
      cardNumber: '5432134569873098',
      cardType: 2,
      expiryDate: '10/17',
      label: 'HDFC Bank Debit'
    }]
  }, {
    provider: 'local',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Super',
    email: 'admin@admin.com',
    password: 'admin',
    mobile: '9998989800',
    gender: 'F',
    newsletter: true,
    specialOffers: true
  }, function() {
      console.log('finished populating users');
    }
  );
});
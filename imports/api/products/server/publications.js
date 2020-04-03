import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/api/products/products.js';

Meteor.publish('products', function products() {
  return Products.find();
});

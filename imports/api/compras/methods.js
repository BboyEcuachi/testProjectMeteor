import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Compras} from './compras.js';
import {Products} from '/imports/api/products/products.js';
import { check } from 'meteor/check';

Meteor.methods({
  'compras.comprar'(data) {
    check(data.productos, Array);
    check(data.user, Object);
    check(data.total, Number);


    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    for (i in data.productos){
      delete data.productos[i]['$$hashKey'];

      Products.update(data.productos[i]._id, {
        $set: {
          stock: (data.productos[i].stock - data.productos[i].cantidad)
        }
      });
    }

    Compras.insert({
      user: data.user,
      productos: data.productos,
      total: data.total,
      createdAt: new Date(),
    });
  },
});

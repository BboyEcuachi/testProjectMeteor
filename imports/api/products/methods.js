import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Products} from './products.js'
import { check } from 'meteor/check';

Meteor.methods({
  'products.insert' (data) {
    check(data, {nombre: String, categoria: String, descripcion: String, imagen: String, valor: Number, stock: Number});

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Products.insert({
      nombre: data.nombre,
      categoria: data.categoria,
      descripcion: data.descripcion,
      imagen: data.imagen,
      valor: data.valor,
      stock: data.stock,
      createdAt: new Date(),
    });
  },
  'products.remove' (productId) {
    check(productId, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Products.remove(productId);
  },
  'products.masStock' (productId, stock) {
    check(productId, String);
    check(stock, Number);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Products.update(productId, {
      $set: {
        stock: stock
      }
    });
  },
  'products.menosStock' (productId, stock) {
    check(productId, String);
    check(stock, Number);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Products.update(productId, {
      $set: {
        stock: stock
      }
    });
  },
});

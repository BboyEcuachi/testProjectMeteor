import { Meteor } from 'meteor/meteor';
import { Compras } from '/imports/api/compras/compras.js'

Meteor.publish('compras', function compras() {
  return Compras.find();
});

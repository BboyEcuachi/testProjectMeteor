import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import template from './productsList.html';
import { Products } from '/imports/api/products/products.js';
import { Compras } from '/imports/api/compras/compras.js';

class ProductsListCtrl {
  constructor($scope) {
    this.imagen = null;
    this.carrito = [];
    $scope.viewModel(this);
    $scope.fileSelected = (element) => {
      var FR= new FileReader();
      FR.addEventListener("load", (e) => {
        this.imagen = e.target.result;
        document.getElementById("img").src = e.target.result;
      });
      FR.readAsDataURL( element.files[0] );
    }

    this.subscribe('products');
    this.subscribe('compras');
    console.log(Meteor.userId())
    this.helpers({
      products() {
        return Products.find({}, {
          sort: {
            createdAt: -1
          }
        });
      },
      compras() {
        return Compras.find({}, {
          sort: {
            createdAt: -1
          }
        });
      },
      misCompras() {
        return Compras.find({
          'user._id': Meteor.userId()
        }, {
          sort: {
            createdAt: -1
          }
        });
      }
    })
  }

  currentUser() {
    return Meteor.user();
  }

  addProduct(ctrl) {
    let data = {
      nombre: ctrl.nombre,
      categoria: ctrl.categoria,
      descripcion: ctrl.descripcion,
      imagen: ctrl.imagen,
      valor: Number(ctrl.valor),
      stock: Number(ctrl.stock),
    }
    console.log(data)
    Meteor.call('products.insert', data);

  }

  masStock(producto){
    Meteor.call('products.masStock', producto._id, producto.stock + 1);
  }

  menosStock(producto){
    Meteor.call('products.menosStock', producto._id, producto.stock  - 1);
  }

  removeProduct(prod){
    Meteor.call('products.remove', prod._id);
    this.sacarcarrito(prod)
  }

  anadirCarrito(prod){
    if (!Meteor.user) {
      document.getElementById("img").src = e.target.result;
    }

    prod['cantidad'] = 1;
    this.carrito.push(prod);
    console.log(this.carrito)
  }

  encarrito(producto){
    return this.carrito.find((i)=> i._id == producto._id);
  }

  masCantidad(producto){
    this.carrito.forEach((i) => i.cantidad = (i._id==producto._id) ? i.cantidad + 1 : i.cantidad)
  }

  menosCantidad(producto){
    if(producto.cantidad == 1){
      this.sacarcarrito(producto);
    }
    else {
      this.carrito.forEach((i) => i.cantidad = (i._id==producto._id) ? i.cantidad - 1 : i.cantidad)
    }
  }

  sacarcarrito(producto){
    this.carrito =  this.carrito.filter((i) => i._id != producto._id)
  }

  comprar(){
    let data = {
      productos: this.carrito,
      user: Meteor.user(),
      total: this.total(),
    }

    Meteor.call('compras.comprar', data);

    this.carrito = []
  }

  total(){
    let suma=0;
    this.carrito.forEach((i) => suma += i.cantidad * i.valor);
    return suma;
  }

  isloged(){
    return Meteor.userId();
  }

}

export default angular.module('productsList', [
  angularMeteor
]).component('productsList', {
  templateUrl: 'imports/components/productsList/productsList.html',
  controller: ['$scope', ProductsListCtrl]
});

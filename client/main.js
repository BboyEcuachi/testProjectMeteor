import angular from 'angular';
import angularMeteor from 'angular-meteor';
import productsList from '../imports/components/productsList/productsList';
import '/imports/startup/client/accounts-config.js';

angular.module('test-project', [
  angularMeteor,
  productsList.name,
  'accounts.ui'
]);

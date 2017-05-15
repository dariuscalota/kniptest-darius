import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';


import * as actionTypes from './actionTypes';
import * as customersActions from './actionCreators';

const AUTH = "Bearer sk_test_r3qwcTbzJd2sDdFGwKDwLYcu";
const URL = "https://api.stripe.com";



axios.defaults.headers.common['Authorization'] = AUTH;

export function fetchCustomer(action$) {
  return action$.ofType(actionTypes.FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        axios.get(`${URL}/v1/customers/${id}`)
      ).map(res => customersActions.fetchCustomerSuccess(res.data));
    });
}

export function fetchCustomers(action$) {
  return action$.ofType(actionTypes.FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(params => {
      return Observable.fromPromise(
        axios.get(`${URL}/v1/customers?${querystring.stringify(params)}`)
      ).map(res => customersActions.fetchCustomersSuccess(res.data.data, params));
    });
}

export function updateCustomer(action$) {
  return action$.ofType(actionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(customer => {

      let body = Object.assign({}, customer); ;
      delete body.id;
      
      return Observable.merge(
        Observable.fromPromise(
          axios.post(`${URL}/v1/customers/${customer.id}?${querystring.stringify(body)}`)
        ).map(res => customersActions.updateCustomerSuccess(res.data)),
        Observable.of(push('/customers'))
      );
    });
}

export function createCustomer(action$) {
  return action$.ofType(actionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(customer => {

      delete customer.id;

      return Observable.merge(
        Observable.fromPromise(
          axios.post(`${URL}/v1/customers?${querystring.stringify(customer)}`)
        ).map(res => customersActions.createCustomerSuccess(res.data)),
        Observable.of(push('/customers'))
      );
    });
}

export function deleteCustomer(action$) {
  return action$.ofType(actionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(customer => {
      return Observable.fromPromise(
        axios.delete(`${URL}/v1/customers/${customer.id}`)
      ).map(res => customersActions.deleteCustomerSuccess(customer));
    });
}

import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';

export function fetchCustomer(payload) {
  return {type: actionTypes.FETCH_ONE, payload};
}

export function fetchCustomerSuccess(payload) {
  const byId = {[payload.id]: payload};
  return {type: actionTypes.FETCH_ONE_SUCCESS, payload: {byId}};
}

export function fetchCustomers(payload) {
  return {type: actionTypes.FETCH_COLLECTION, payload};
}

export function fetchCustomersSuccess(customers, params) {
  const byId = keyBy(customers, (customer) => customer.id);
  return {type: actionTypes.FETCH_COLLECTION_SUCCESS, payload: {byId, params}};
}

export function createCustomer(payload) {
  return {type: actionTypes.CREATE, payload};
}

export function createCustomerSuccess(payload) {
  return {type: actionTypes.CREATE_SUCCESS, payload};
}

export function updateCustomer(payload) {
  return {type: actionTypes.UPDATE, payload};
}

export function updateCustomerSuccess(payload) {
  return {type: actionTypes.UPDATE_SUCCESS, payload};
}

export function deleteCustomer(payload) {
  return {type: actionTypes.DELETE, payload};
}

export function deleteCustomerSuccess(payload) {
  return {type: actionTypes.DELETE_SUCCESS, payload};
}

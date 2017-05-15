export function getParams(state) {
  return state.customers.params;
}

export function getCustomer(state, id) {
  return state.customers.byId[id];
}

export function getCustomers(state) {
  return Object.values(state.customers.byId);
}

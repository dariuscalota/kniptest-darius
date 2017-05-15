import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import customers from './customers/reducer';

export default combineReducers({
  customers,
  routing: routerReducer,
});

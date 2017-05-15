import { combineEpics } from 'redux-observable';
import { values } from 'lodash';

import * as customersEpics from './customers/epics';

export default combineEpics(
  ...values(customersEpics)
);

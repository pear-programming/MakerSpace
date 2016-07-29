import { combineReducers } from 'redux';
import OrgsReducer from './reducer_organizations';

const rootReducer = combineReducers({
  organizations: OrgsReducer
});

export default rootReducer;
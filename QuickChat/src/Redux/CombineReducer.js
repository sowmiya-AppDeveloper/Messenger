import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ApiReducer from './ApiReducer';

const CombineReducer = combineReducers({
  auth: AuthReducer,
  api: ApiReducer,
  // Add more reducers if needed
});

export default CombineReducer;

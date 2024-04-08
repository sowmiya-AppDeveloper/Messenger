// store.js
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import CombineReducer from './CombineReducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const store = createStore(
  CombineReducer,
  initialState,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;

// actions.js

import jestConfig from '../../jest.config.js';
import {
  ADD_DATA,
  API_DATA_RECEIVED,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  GET_USER_DATA_BY_USER_ID,
  LOGIN,
  REGISTER_USER,
  STORE_LOGIN,
  STORE_USER_DATA,
  requestUrl,
} from '../Common/Constants.js';

export const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  error,
});
export const fetchDataSuccess = jsonData => {
  console.log('fetchDataSuccess :', jsonData);
  return {
    type: FETCH_DATA_SUCCESS,
    jsonData: jsonData,
  };
};

export const addData = data => {
  return {
    type: ADD_DATA,
    jsonData: data,
  };
};
export const dispatchRegisterUser = jsonData => {
  return {
    type: REGISTER_USER,
    requestUrl: requestUrl.registerUser,
    jsonData: jsonData,
    noAuth: true,
  };
};

export const storeResponseData = jsonData => {
  return {
    type: STORE_USER_DATA,
    jsonData: jsonData,
  };
};
export const dispatchLogin = jsonData => {
  return {
    type: LOGIN,
    requestUrl: requestUrl.login,
    jsonData: jsonData,
    noAuth: true,
  };
};
export const getUserDetails = jsonData => {
  return {
    type: GET_USER_DATA_BY_USER_ID,
    requestUrl: requestUrl.getUserDetailsByUserId,
    jsonData: jsonData,
  };
};
export const storeLoginResponse = jsonData => {
  return {
    type: STORE_LOGIN,
    jsonData: jsonData,
  };
};

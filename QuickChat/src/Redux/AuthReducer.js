import {
  LOGIN,
  REGISTER_USER,
  STORE_ALL_USER,
  STORE_LOGIN,
  STORE_USER_DATA,
} from '../Common/Constants';

// AuthReducer.js
const initialState = {
  appData: '',
  userData: '',
  userDetails: {},
  allUserDetails: [],
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        appData: action.jsonData,
      };
    case STORE_USER_DATA:
      return {
        userData: action.jsonData,
      };

    case LOGIN:
      return {
        appData: action.jsonData,
      };
    case STORE_LOGIN:
      return {
        userDetails: action.jsonData,
      };

    default:
      return state;
  }
};

export default AuthReducer;

export const testingUrl = 'http://172.16.16.26:8001/api/';

export const RESET_REDUX_STORE = 'RESET_REDUX_STORE';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const ADD_DATA = 'ADD_DATA';
export const API_DATA_RECEIVED = 'API_DATA_RECEIVED';
export const API_DATA_ERROR = 'API_DATA_ERROR';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN = 'LOGIN';
export const ALL_USER_DETAILS = 'ALL_USER_DETAILS';
export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const GET_ALL_FRIEND_REQUEST = 'GET_ALL_FRIEND_REQUEST';
export const SEND_ACCEPT_REQUEST = 'SEND_ACCEPT_REQUEST';
export const GET_ACCEPTED_FRIENDS_LIST = 'GET_ACCEPTED_FRIENDS_LIST';
export const STORE_MESSAGES_TO_DB = 'STORE_MESSAGES_TO_DB';
export const CHAT_HEADER_DATA = 'CHAT_HEADER_DATA';
export const GET_MESSAGES = 'GET_MESSAGES';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const SENT_FRI_REQ_LIST = 'SENT_FRI_REQ_LIST';
export const GET_FRIENDS_LIST = 'GET_FRIENDS_LIST';
//getResponseData
export const STORE_USER_DATA = 'STORE_USER_DATA';
export const STORE_LOGIN = 'STORE_LOGIN';
export const STORE_ALL_USER = 'STORE_ALL_USER';
export const GET_USER_DATA_BY_USER_ID = 'GET_USER_DATA_BY_USER_ID';
export const STORE_REQUESTED_FRIENDS_LIST = 'STORE_REQUESTED_FRIENDS_LIST';
export const STORE_ACCEPTED_FRIENDS_LIST = 'STORE_ACCEPTED_FRIENDS_LIST';
export const STORE_RECIPIENT_DATA = 'STORE_RECIPIENT_DATA';
export const STORE_MESSAGES_LIST = 'STORE_MESSAGES_LIST';
export const AuthToken = 'Bearer ';
export const requestUrl = {
  registerUser: testingUrl + 'signup',
  login: testingUrl + 'signin',
  allUserDetails: testingUrl + 'allUserDetails',
  getUserDetailsByUserId: testingUrl + 'getUserDetailsById',
  sendFriendRequest: testingUrl + 'friend_request',
  getFriendsRequest: testingUrl + 'getAllFriendRequest',
  acceptRequest: testingUrl + 'acceptFriendRequest',
  acceptedFriendsList: testingUrl + 'acceptedFriendsList',
  saveMessages: testingUrl + 'messages',
  chatHeaderDet: testingUrl + 'user',
  getMessages: testingUrl + 'messages',
  deleteMessages: testingUrl + 'deleteMessages',
  getSentReqList: testingUrl + 'friend-requests/sent',
  getFriendsList: testingUrl + 'friends',
  //Authorized URl's
  // Header For Api Call Without Authorization.
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  // Header For Api Call With Authorization.
  AuthHeader: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: AuthToken,
  },

  /** For Multipart Form data add fileUpload = true in action.js
   * Before hitting form data please update the Http.Authorization it will not contain token*/
  // Form Data Header with Authorization
  FormDataHeader: {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
    Authorization: AuthToken,
  },
};

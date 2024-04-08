// actions.js

import jestConfig from '../../jest.config.js';
import {
  ALL_USER_DETAILS,
  CHAT_HEADER_DATA,
  DELETE_MESSAGE,
  GET_ACCEPTED_FRIENDS_LIST,
  GET_ALL_FRIEND_REQUEST,
  GET_FRIENDS_LIST,
  GET_MESSAGES,
  SEND_ACCEPT_REQUEST,
  SEND_FRIEND_REQUEST,
  SENT_FRI_REQ_LIST,
  STORE_ACCEPTED_FRIENDS_LIST,
  STORE_ALL_USER,
  STORE_MESSAGES_LIST,
  STORE_MESSAGES_TO_DB,
  STORE_RECIPIENT_DATA,
  STORE_REQUESTED_FRIENDS_LIST,
  requestUrl,
} from '../Common/Constants.js';

export const dispatchAllUserData = jsonData => {
  return {
    type: ALL_USER_DETAILS,
    requestUrl: requestUrl.allUserDetails,
    jsonData: jsonData,
  };
};
export const storeAllUserResponse = jsonData => {
  return {
    type: STORE_ALL_USER,
    jsonData: jsonData,
  };
};
export const dispatchFriendRequest = jsonData => {
  return {
    type: SEND_FRIEND_REQUEST,
    requestUrl: requestUrl.sendFriendRequest,
    jsonData: jsonData,
  };
};
export const getFriendRequest = jsonData => {
  return {
    type: GET_ALL_FRIEND_REQUEST,
    requestUrl: requestUrl.getFriendsRequest,
    jsonData: jsonData,
  };
};
export const storeRequestFriends = jsonData => {
  console.log('storeRequestFriends', jsonData);

  return {
    type: STORE_REQUESTED_FRIENDS_LIST,
    jsonData: jsonData,
  };
};
export const dispatchAcceptReq = jsonData => {
  return {
    type: SEND_ACCEPT_REQUEST,
    requestUrl: requestUrl.acceptRequest,
    jsonData: jsonData,
  };
};
export const getAcceptedListReq = jsonData => {
  return {
    type: GET_ACCEPTED_FRIENDS_LIST,
    requestUrl: requestUrl.acceptedFriendsList,
    jsonData: jsonData,
  };
};
export const storeAcceptedFriendsList = jsonData => {
  console.log('storeRequestFriends', jsonData);

  return {
    type: STORE_ACCEPTED_FRIENDS_LIST,
    jsonData: jsonData,
  };
};
export const dispatchToSaveMessagesReq = (jsonData, extraData) => {
  return {
    type: STORE_MESSAGES_TO_DB,
    requestUrl: requestUrl.saveMessages,
    jsonData: jsonData,
    multipart: true,
    extraData: extraData,
  };
};
export const getUserDetReqForChatHead = jsonData => {
  return {
    type: CHAT_HEADER_DATA,
    requestUrl: requestUrl.chatHeaderDet + '/' + jsonData.id,
    get: true,
    jsonData: jsonData,
  };
};
export const getMessagesReq = jsonData => {
  console.log('getMessagesReq', jsonData);
  return {
    type: GET_MESSAGES,
    requestUrl:
      requestUrl.getMessages +
      '/' +
      jsonData.senderId +
      '/' +
      jsonData.recipientId,
    get: true,
  };
};
export const storeRecipientData = jsonData => {
  return {
    type: STORE_RECIPIENT_DATA,
    jsonData: jsonData,
  };
};
export const storeMessages = jsonData => {
  return {
    type: STORE_MESSAGES_LIST,
    jsonData: jsonData,
  };
};
export const deleteMessagesReq = (jsonData, extraData) => {
  return {
    type: DELETE_MESSAGE,
    requestUrl: requestUrl.deleteMessages,
    jsonData: jsonData,
    extraData: extraData,
  };
};
export const sendFrdReqList = (jsonData, extraData) => {
  return {
    type: SENT_FRI_REQ_LIST,
    requestUrl: requestUrl.getSentReqList + '/' + jsonData.userId,
    get: true,
    jsonData: jsonData,
  };
};
export const getFriendsList = (jsonData, extraData) => {
  return {
    type: GET_FRIENDS_LIST,
    requestUrl: requestUrl.getFriendsList + '/' + jsonData.userId,
    get: true,
    jsonData: jsonData,
  };
};

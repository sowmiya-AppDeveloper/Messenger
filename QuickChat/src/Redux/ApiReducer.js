import {
  STORE_ACCEPTED_FRIENDS_LIST,
  STORE_ALL_USER,
  STORE_MESSAGES_LIST,
  STORE_RECIPIENT_DATA,
  STORE_REQUESTED_FRIENDS_LIST,
} from '../Common/Constants';

const initialState = {
  allUserDetails: [],
  requestFriendsList: [],
  acceptedFrdList: [],
  recipientData: {},
  messageList: [],
};

const ApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ALL_USER:
      return {
        ...state, // Keep the existing state

        allUserDetails: action.jsonData.allUserDetails,
      };

    case STORE_REQUESTED_FRIENDS_LIST:
      console.log('STORE_ALL_USERSTORE_ALL_USER', action.jsonData);

      return {
        ...state,
        requestFriendsList: action.jsonData.friendRequestList,
      };

    case STORE_ACCEPTED_FRIENDS_LIST:
      return {
        ...state,
        acceptedFrdList: action.jsonData.acceptedFriends,
      };
    case STORE_RECIPIENT_DATA:
      return {
        ...state,
        recipientData: action.jsonData.recipientId,
      };

    case STORE_MESSAGES_LIST:
      return {
        ...state,
        messageList: action.jsonData,
      };
    default:
      return state;
  }
};
export default ApiReducer;

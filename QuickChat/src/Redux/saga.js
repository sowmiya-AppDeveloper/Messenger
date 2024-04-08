import {call, put, take, takeEvery} from 'redux-saga/effects';
import {
  ALL_USER_DETAILS,
  CHAT_HEADER_DATA,
  DELETE_MESSAGE,
  GET_ACCEPTED_FRIENDS_LIST,
  GET_ALL_FRIEND_REQUEST,
  GET_FRIENDS_LIST,
  GET_MESSAGES,
  GET_USER_DATA_BY_USER_ID,
  LOGIN,
  REGISTER_USER,
  SEND_ACCEPT_REQUEST,
  SEND_FRIEND_REQUEST,
  SENT_FRI_REQ_LIST,
  STORE_MESSAGES_TO_DB,
  requestUrl,
} from '../Common/Constants';
import {
  dispatchAllUserData,
  dispatchUserIdToGetAllUserData,
  getAcceptedListReq,
  getMessagesReq,
  storeAcceptedFriendsList,
  storeAllUserResponse,
  storeMessages,
  storeRecipientData,
  storeRequestFriends,
} from './ApiAction';
import {
  fetchDataFailure,
  storeLoginResponse,
  storeResponseData,
} from './AuthAction';

const axios = require('axios').default;
function* registerSaga(action) {
  var header = {};

  // Header Without Authentication pass noAuth in action, multipart for multipart
  if (action.noAuth) {
    header = requestUrl.HEADERS;
  } else {
    if (action.multiPart) {
      header = requestUrl.FormDataHeader;
    } else {
      header = requestUrl.AuthHeader;
    }
  }

  var method = 'post';

  if (action.get) {
    method = 'get';
  }

  var config = {
    method: method,
    url: action.requestUrl.trim(),
    data: JSON.stringify(action.jsonData),
    headers: header,
  };

  console.log('Request Config =====>: ', action);

  try {
    const response = yield call(axios, config, {timeout: 5000});

    console.log('Response Data >>:', JSON.stringify(response));

    yield put(storeResponseData(response.data)); // Dispatch the new action
    action.jsonData.OnSuccess(response.data);
  } catch (error) {
    console.log('---------------->Api Data Error<----------------------');
    console.log('ERROR DATA>>:', JSON.stringify(error));

    yield put(fetchDataFailure(error));

    if (error.response && error.response.status === 401) {
    } else {
    }
  }
}

function* loginSaga(action) {
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', action);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('Response Data >>:', response.data);
    requestUrl.AuthHeader.Authorization = 'Bearer ' + response.data.token;
    requestUrl.FormDataHeader.Authorization = 'Bearer ' + response.data.token;
    console.log('Response Data >>:', response.data.token);

    yield put(storeLoginResponse(response.data.user)); // Dispatch the new action
    action.jsonData.OnSuccess(response.data);
    let json = {
      id: response.data.user._id,
    };
    console.log('userDetails Found Auto Login : ', json);

    yield put(dispatchAllUserData(json));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}
function* allUserSaga(action) {
  console.log('allUserSaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };
    console.log('Request Config =====>: ', action);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('Response DataForAllUserDet >>:', response.data);

    yield put(storeAllUserResponse(response.data)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
    // yield put(fetchDataFailure(error));
  }
}

function* getUserDetailBySaga(action) {
  console.log('getUserDetailsBySaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response ConfigApplicationData =====>: ', response.data.token);
    requestUrl.AuthHeader.Authorization = 'Bearer ' + response.data.token;
    requestUrl.FormDataHeader.Authorization = 'Bearer ' + response.data.token;
    yield put(storeLoginResponse(response.data.user)); // Dispatch the new action
    action.jsonData.OnSuccess(response.data);
    console.log('userDetails Found Auto Login : ', response.data);

    let json = {
      id: response.data.user._id,
    };
    console.log('userDetails Found Auto Login : ', json);

    yield put(dispatchAllUserData(json));
  } catch (error) {
    console.log('error status', error);
    // yield put(fetchDataFailure(error));
  }
}

function* sendFriendReqSaga(action) {
  console.log('sendFriendReqSaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response Config =====>: ', response);
    action.jsonData.OnSuccess(response.data);

    // yield put(storeLoginResponse(response.data.user)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
  }
}
function* getFriendListSaga(action) {
  console.log('getFriendListSaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response ConfigForFriendReq =====>: ', response.data);
    action.jsonData.OnSuccess(response.data);

    yield put(storeRequestFriends(response.data)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
  }
}
function* acceptReqSaga(action) {
  console.log('getFriendListSaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response ConfigForFriendReq =====>: ', response.data);
    action.jsonData.OnSuccess(response.data);

    // yield put(storeRequestFriends(response.data)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
  }
}
function* getAcceptedFrdSaga(action) {
  console.log('getAcceptedFrdSaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response ConfigForFriendReq =====>: ', response.data);
    action.jsonData.OnSuccess(response.data);

    yield put(storeAcceptedFriendsList(response.data)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
  }
}
function* storeMessageSaga(action) {
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multipart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: action.multipart
        ? action.jsonData
        : JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response ConfigForFriendReq =====>: ', response.data);
    action.extraData.OnSuccess(response.data);

    let jd = {
      recipientId: action.extraData.recipientId,
      senderId: action.extraData.senderId,
    };
    yield put(getMessagesReq(jd));
  } catch (error) {
    console.log('error status', error);
  }
}
function* chatHeaderDtaSage(action) {
  console.log('chatHeaderDtaSage1111111111111', action.jsonData);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    // console.log('response ConfigForFriendReq =====>: ', response.data);
    action.jsonData.OnSuccess(response.data);

    let jd = {
      recipientId: action.jsonData.id,
      senderId: action.jsonData.senderId,
    };
    // console.log('response ConfigForFriendReqJDDDDDDDDDDD =====>: ', jd);

    yield put(getMessagesReq(jd));
    yield put(storeRecipientData(response.data)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
  }
}
function* getMessageSaga(action) {
  console.log('getMessageSaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response ConfigForGETALLMESSAGESReq =====>: ', response.data);
    // action.jsonData.OnSuccess(response.data);

    yield put(storeMessages(response.data)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
  }
}
function* deleteMessageSaga(action) {
  console.log('deleteMessageSaga', action);
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    console.log('Request Config =====>: ', config);

    const response = yield call(axios, config, {timeout: 5000});
    console.log('response ConfigForGETALLMESSAGESReq =====>: ', response.data);
    action.jsonData.OnSuccess(action.extraData);

    // yield put(storeMessages(response.data)); // Dispatch the new action
  } catch (error) {
    console.log('error status', error);
  }
}
function* sendFrdReqSaga(action) {
  try {
    var header = {};

    // Header Without Authentication pass noAuth in action, multipart for multipart
    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    const response = yield call(axios, config, {timeout: 5000});

    action.jsonData.OnSuccess(response.data);
    console.log('sendFrdReqSaga', response);
  } catch (error) {
    console.log('error status', error);
  }
}
function* getFriendSaga(action) {
  try {
    var header = {};

    if (action.noAuth) {
      header = requestUrl.HEADERS;
    } else {
      if (action.multiPart) {
        header = requestUrl.FormDataHeader;
      } else {
        header = requestUrl.AuthHeader;
      }
    }

    var method = 'post';

    if (action.get) {
      method = 'get';
    }

    var config = {
      method: method,
      url: action.requestUrl.trim(),
      data: JSON.stringify(action.jsonData),
      headers: header,
    };

    const response = yield call(axios, config, {timeout: 5000});

    action.jsonData.OnSuccess(response.data);
  } catch (error) {
    console.log('error status', error);
  }
}
function* rootSaga() {
  yield takeEvery(REGISTER_USER, registerSaga);
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(ALL_USER_DETAILS, allUserSaga);
  yield takeEvery(GET_USER_DATA_BY_USER_ID, getUserDetailBySaga);
  yield takeEvery(SEND_FRIEND_REQUEST, sendFriendReqSaga);
  yield takeEvery(GET_ALL_FRIEND_REQUEST, getFriendListSaga);
  yield takeEvery(SEND_ACCEPT_REQUEST, acceptReqSaga);
  yield takeEvery(GET_ACCEPTED_FRIENDS_LIST, getAcceptedFrdSaga);
  yield takeEvery(STORE_MESSAGES_TO_DB, storeMessageSaga);
  yield takeEvery(CHAT_HEADER_DATA, chatHeaderDtaSage);
  yield takeEvery(GET_MESSAGES, getMessageSaga);
  yield takeEvery(DELETE_MESSAGE, deleteMessageSaga);
  yield takeEvery(SENT_FRI_REQ_LIST, sendFrdReqSaga);
  yield takeEvery(GET_FRIENDS_LIST, getFriendSaga);

  // Add other sagas here if needed
}

export default rootSaga;

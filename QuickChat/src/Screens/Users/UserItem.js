import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../Common/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  dispatchFriendRequest,
  getFriendsList,
  sendFrdReqList,
} from '../../Redux/ApiAction';
import {LOGIN} from '../../Common/Constants';

const UserItem = props => {
  const userDetails = useSelector(({auth}) => auth.userDetails);
  const dispatch = useDispatch();
  const [sentRequest, setSentRequest] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const areaName =
    props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      let dt = {
        userId: userDetails._id,
        OnSuccess: response => onSuccessSentReq(response),
      };
      dispatch(sendFrdReqList(dt));
    };

    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const fetchUserFriends = async () => {
      let dt = {
        userId: userDetails._id,
        OnSuccess: response => onSuccessFriendListReq(response),
      };
      dispatch(getFriendsList(dt));
    };

    fetchUserFriends();
  }, []);
  const sendFriendRequest = d => {
    if (d == 1) {
      console.log('Remove');
    } else {
      let jd = {
        selectedUserId: props.item._id,
        currentUserId: userDetails._id,
        OnSuccess: response => onSuccess(response),
      };
      console.log('UserItem', jd);
      dispatch(dispatchFriendRequest(jd));
    }
  };
  const onSuccess = res => {
    try {
      if (res.message === 'success') {
        setSentRequest(true);
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };

  const onSuccessSentReq = res => {
    console.log('responseData' + res);

    try {
      if (res != '') {
        setFriendRequests(res);
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };
  const onSuccessFriendListReq = res => {
    try {
      setUserFriends(res);
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };
  return (
    <TouchableOpacity style={styles.contentBaseStyle}>
      <View style={styles.profileStyle}>
        <Text style={styles.initialTextStyle}>{areaName.charAt(0)}</Text>
      </View>
      <View style={{marginLeft: 12, flex: 1}}>
        <Text style={{fontWeight: 'bold'}}>{props.item.name}</Text>
        <Text style={{marginTop: 4, color: 'grey'}}>{props.item.email}</Text>
      </View>

      {userFriends?.includes(props.item._id) ? (
        <Pressable
          style={{
            backgroundColor: '#82CD47',
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Friends</Text>
        </Pressable>
      ) : sentRequest ||
        friendRequests?.some(friend => friend?._id === props?.item._id) ? (
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 6,
            width: 105,
            backgroundColor: colors.grey,
          }}>
          <Text style={styles.addFriText}>Request Sent</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => sendFriendRequest(2)}>
          <Text style={styles.addFriText}>Add Friend</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  contentBaseStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    // borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: colors.green,
  },
  initialTextStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.white,
  },
  requestButton: {
    padding: 10,
    borderRadius: 6,
    width: 105,
    backgroundColor: '#162783',
  },
  addFriText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 14,
  },
});

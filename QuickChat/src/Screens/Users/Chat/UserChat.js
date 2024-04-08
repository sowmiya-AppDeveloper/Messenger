import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../Common/colors';
import {textFontFace} from '../../../Common/styles';
import {
  getMessagesReq,
  getUserDetReqForChatHead,
} from '../../../Redux/ApiAction';
import Header from '../../../Components/Header';

const UserChat = props => {
  const userDetails = useSelector(({auth}) => auth.userDetails);
  const messageList = useSelector(({api}) => api.messageList);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const areaName =
    props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1);

  useEffect(() => {
    let jd = {
      recipientId: props.item._id,
      senderId: userDetails._id,
    };

    dispatch(getMessagesReq(jd));
  }, []);

  const handleNavigateChat = () => {
    let jd = {
      id: props.item._id,
      senderId: userDetails._id,
      OnSuccess: response => onSuccess(response),
    };
    dispatch(getUserDetReqForChatHead(jd));
  };
  const onSuccess = res => {
    try {
      if (res.message === 'success') {
        navigation.navigate('messages', res.recipientId);
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };
  const getLastMessage = () => {
    const userMess = messageList.filter(mess => mess.messageType === 'text');
    console.log('lastMessage*********************8', userMess);

    const n = userMess.length;
    return userMess[n - 1];
  };

  const lastMess = getLastMessage();
  console.log('Error in onSuccess:', lastMess);
  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };
  return (
    <View>
      <>
        <TouchableOpacity style={styles.container} onPress={handleNavigateChat}>
          <View style={styles.profileStyle}>
            <Text style={styles.initialTextStyle}>{areaName.charAt(0)}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: textFontFace,
              }}>
              {props.item.name}
            </Text>
            {/* <Text
              style={{marginTop: 5, color: 'grey', fontFamily: textFontFace}}>
              {lastMess?.message}
            </Text> */}
          </View>
          <View>
            <Text
              style={{
                fontSize: 11,
                fontFamily: textFontFace,
                color: '#585858',
              }}>
              {/* {formatTime(lastMess?.timeStamp)} */}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.7,
    borderColor: '#D0D0D0',
    marginVertical: 15,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
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
});

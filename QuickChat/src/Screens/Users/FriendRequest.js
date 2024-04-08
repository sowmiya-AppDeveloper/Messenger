import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../Common/colors';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchAcceptReq, getAcceptedListReq} from '../../Redux/ApiAction';
import {useNavigation} from '@react-navigation/native';

const FriendRequest = props => {
  const userDetails = useSelector(({auth}) => auth.userDetails);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const areaName =
    props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1);
  const onPressAcceptBtn = () => {
    var jd = {
      senderId: props.item.id,
      recipientId: userDetails._id,
      OnSuccess: response => onSuccess(response),
    };
    dispatch(dispatchAcceptReq(jd));
  };
  const onSuccess = res => {
    try {
      if (res.message === 'Friend Request accepted successfully') {
        let jd = {
          id: userDetails?._id,
          OnSuccess: response => onSuccessSendChat(response),
        };
        console.log('handleChatScreen', userDetails);
        dispatch(getAcceptedListReq(jd));
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };

  const onSuccessSendChat = res => {
    props.setFriendsData(
      props.friendsData.filter(req => req.id !== props.item.id),
    );

    navigation.navigate('chats');
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.profileStyle}>
        <Text style={styles.initialTextStyle}>{areaName.charAt(0)}</Text>
      </View>
      <Text style={{fontWeight: 'bold', flex: 1, marginLeft: 10, fontSize: 15}}>
        {areaName} sent you a friend request!!
      </Text>
      <TouchableOpacity
        style={styles.acceptBtnContainer}
        onPress={onPressAcceptBtn}>
        <Text style={styles.acceptBtn}>Accept</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  acceptBtn: {
    textAlign: 'center',
    color: colors.white,
  },
  acceptBtnContainer: {
    backgroundColor: '#0066b2',
    padding: 10,
    borderRadius: 6,
  },
  profileStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',

    justifyContent: 'center',
    backgroundColor: colors.orange,
  },
  initialTextStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.white,
  },
});

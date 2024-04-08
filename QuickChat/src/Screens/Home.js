import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../Common/colors';
import {textFontFaceSemiBold} from '../Common/styles';
import {getAcceptedListReq, getFriendRequest} from '../Redux/ApiAction';
import UserItem from './Users/UserItem';
import {displayNotification, getFirebaseMessageToken} from '../Common/utils';
import firebase from '@react-native-firebase/messaging';
const Home = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(({auth}) => auth.userDetails);

  const dispatch = useDispatch();
  const allUserDetails = useSelector(({api}) => api.allUserDetails);

  useEffect(() => {
    getFirebaseMessageToken();
    //while app open in foreground
    const notes = firebase().onMessage(async notify => {
      const message = notify;
      console.log('messageHOME==>', message);

      displayNotification(message);
    });
    return () => notes;
  }, []);

  const handleChatScreen = () => {
    let jd = {
      id: userDetails?._id,
      OnSuccess: response => onSuccessSendChat(response),
    };
    console.log('handleChatScreen', userDetails);
    dispatch(getAcceptedListReq(jd));
  };

  const onSuccessSendChat = res => {
    try {
      if (res.message === 'success') {
        navigation.navigate('chats');
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };
  const handleFriendScreen = () => {
    let jd = {
      id: userDetails?._id,
      OnSuccess: response => onSuccess(response),
    };

    dispatch(getFriendRequest(jd));
  };
  const onSuccess = res => {
    try {
      if (res.message === 'success') {
        navigation.navigate('friendScreen');
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };
  const renderUser = ({item}) => {
    return <UserItem item={item} />;
  };

  const onPressNavigateAccount = () => {
    navigation.navigate('account');
  };
  return (
    <View style={{flex: 1, marginHorizontal: 10, marginVertical: 5}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onPressNavigateAccount}>
          <Image
            source={require('../../Assets/Images/user.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>

        {/* <Text
          style={{
            flex: 1,
            fontFamily: textFontFaceSemiBold,
            fontSize: 24,
            marginHorizontal: 10,
          }}>
          Quick Chat
        </Text> */}
        <View style={{flex: 1}}></View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={24}
            color={colors.black}
            onPress={handleChatScreen}
          />
          <MaterialIcons
            name="people-outline"
            size={24}
            color={colors.black}
            onPress={handleFriendScreen}
          />
        </View>
      </View>
      <View style={{flex: 1, marginVertical: 10}}>
        <FlatList
          data={allUserDetails}
          keyExtractor={item => item._id}
          renderItem={renderUser}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

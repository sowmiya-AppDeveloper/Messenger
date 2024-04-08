import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import UserChat from './UserChat';
import Header from '../../../Components/Header';
import {colors} from '../../../Common/colors';

const Chat = () => {
  const acceptedFrdList = useSelector(({api}) => api.acceptedFrdList);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{backgroundColor: colors.white, flex: 1}}>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Header title={'Chats'} />
        </View>
        {acceptedFrdList?.map((item, index) => {
          return <UserChat item={item} key={index} />;
        })}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({});

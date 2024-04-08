import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFriendRequest} from '../../Redux/ApiAction';
import FriendRequest from './FriendRequest';
import Header from '../../Components/Header';

const FriendsScreen = () => {
  const requestFriendsList = useSelector(({api}) => api.requestFriendsList);
  const dispatch = useDispatch();
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    sendFriendRequests();
  }, []);
  const sendFriendRequests = () => {
    const friendReqData = requestFriendsList.map(frdReq => ({
      id: frdReq._id,
      name: frdReq.name,
      email: frdReq.email,
      image: frdReq?.image,
    }));
    setFriendsData(friendReqData);
  };

  const renderRequestedFriends = ({item}) => {
    return (
      <FriendRequest
        item={item}
        setFriendsData={setFriendsData}
        friendsData={friendsData}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header title={'Friend Request'} />
      {/* {requestFriendsList.length > 0 && (
        <Text style={{marginTop: 10, marginHorizontal: 10, fontSize: 16}}>
          Your Friend Requests!
        </Text>
      )} */}

      <FlatList
        data={friendsData}
        keyExtractor={item => item.id}
        renderItem={renderRequestedFriends}
      />
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
});

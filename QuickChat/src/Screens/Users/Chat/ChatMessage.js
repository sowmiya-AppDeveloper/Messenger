import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  launchCamera
} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { requestUrl } from '../../../Common/Constants';
import { colors } from '../../../Common/colors';
import { textFontFaceSemiBold } from '../../../Common/styles';
import Header from '../../../Components/Header';
import {
  deleteMessagesReq,
  getMessagesReq
} from '../../../Redux/ApiAction';
import CameraScreen from './CameraScreen';
const ChatMessage = props => {
  const messageList = useSelector(({api}) => api.messageList);

  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const [emoji, setEmoji] = useState('');
  const Tab = createMaterialTopTabNavigator();
  const [data, setData] = useState([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const userDetails = useSelector(({auth}) => auth.userDetails);
  const recipientData = useSelector(({api}) => api.recipientData);
  const scrollViewRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const flatListRef = useRef(null); // Ref for the FlatList component
  const currentPageRef = useRef(35); // Ref for the current page
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    console.log('WHATEVERYOUWANT', messageList);
    setChatMessages(messageList);
  }, [messageList]);

  useEffect(() => {
    const socket = io('http://172.16.16.26:8001');
    socket.on('chat message', msg => {
      if (msg != '') {
        setChatMessages(msg);
      } else {
        setChatMessages(messageList);
      }
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const areaName =
    props.route.params.name.charAt(0).toUpperCase() +
    props.route.params.name.slice(1);
  const handleEmojiSelector = () => {
    setShowEmojis(!showEmojis);
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: false});
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const sendMessage = (messageType, imageUri) => {
    const socket = io('http://172.16.16.26:8001');
    const token = requestUrl.AuthHeader.Authorization;

    const formData = new FormData();
    formData.append('senderId', token);
    formData.append('recipientId', recipientData._id);
    formData.append('fcmToken', props.route.params.fcmToken);
    if (messageType === 'image') {
      formData.append('messageType', 'image');
      formData.append('imageFile', {
        uri: imageUri.image.uri,
        name: imageUri.image.filename,
        type: imageUri.type,
      });
    } else {
      formData.append('messageType', 'text');
      formData.append('messageText', chatMessage);
    }

    setChatMessage('');
    // Emit the message data to the server
    socket.emit('chat message', formData);
  };

  // const sendMessage = (messageType, imageUri) => {
  //   let formData = new FormData();
  //   const socket = io('http://172.16.16.26:8001');
  //   if (messageType === 'image') {
  //     formData.append('imageFile', {
  //       uri: imageUri.image.uri,
  //       name: imageUri.image.filename,
  //       type: imageUri.type,
  //     });

  //     formData.append('messageType', 'image');
  //   } else {
  //     formData.append('messageType', 'text');
  //     formData.append('messageText', message);
  //   }
  //   formData.append('senderId', userDetails._id);
  //   formData.append('recipientId', recipientData._id);
  //   setChatMessage('');

  //   let extraData = {
  //     senderId: userDetails._id,
  //     recipientId: recipientData._id,
  //     OnSuccess: response => onSuccess(response),
  //   };
  //   socket.emit('chat message', formData);
  //   dispatch(dispatchToSaveMessagesReq(formData, extraData));
  // };
  const onSuccess = res => {
    try {
      if (res.status === 'success') {
        setMessage('');
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (showEmojis) {
        setEmoji(false);
      }
    }),
      Keyboard.addListener('keyboardWillShow', () => {
        if (showEmojis) {
          setShowEmojis(false);
        }
      });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
      Keyboard.removeAllListeners('keyboardWillShow');
    };
  }, []);

  const handleEmojiSelect = emoji => {
    setMessage(prevText => prevText + emoji);
    setShowEmojiSelector(false);
  };

  const handleSelectMessage = message => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      console.log('zzzzzzzzzzzzzzzzzzzzzz', isSelected);

      setSelectedMessages(previousMessages =>
        previousMessages.filter(id => id !== message._id),
      );
    } else {
      setSelectedMessages(previousMessages => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  const onPressItemDeSelect = message => {
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      console.log('zzzzzzzzzzzzzzzzzzzzzz', isSelected);

      setSelectedMessages(previousMessages =>
        previousMessages.filter(id => id !== message._id),
      );
    }
  };
  const deleteMessages = messageIds => {
    try {
      let jd = {
        messages: messageIds,
        OnSuccess: response => onSuccessDeleteMess(response),
      };

      let extraData = {
        messageIds: messageIds,
      };

      dispatch(deleteMessagesReq(jd, extraData));
    } catch (error) {
      console.log('error deleting messages', error);
    }
  };

  const onSuccessDeleteMess = res => {
    console.log('onSuccessDeleteMess', res);

    setSelectedMessages(prevSelectedMessages =>
      prevSelectedMessages.filter(id => !res.messageIds.includes(id)),
    );

    let jd = {
      recipientId: recipientData._id,
      senderId: userDetails._id,
    };
    dispatch(getMessagesReq(jd));
  };
  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  const pickImage = async () => {
    const deviceResources = await CameraRoll.getPhotos({
      assetType: 'All',
      include: ['albums', 'filename'],
      first: currentPageRef.current,
    });
    const images = deviceResources.edges;
    setData(images);
    setOpenModal(true);
  };

  const onCameraPress = () => {
    setOpenModal(false);
  };
  const onFileUploadPress = res => {
    setOpenModal(false);
    console.log('onFileUploadPress', res);
    sendMessage('image', res);
  };
  const handleCameraPress = () => {
    setOpenModal(false);
    launchCamera({
      mediaType: 'mixed',
      cameraType: 'back',
      includeBase64: false,
      saveToPhotos: true,
    })
      .then(res => {
        console.log('dddddddddddd', res);
        sendMessage('image', res.assets[0].uri);
      })
      .catch(err => {
        console.log(err);
        setOpenModal(false);
      });
  };

  const renderCamera = ({item}) => {
    return (
      <CameraScreen
        item={item}
        onclick={onCameraPress}
        handleCameraPress={handleCameraPress}
        onFileUploadPress={onFileUploadPress}
      />
    );
  };

  const handleEndReached = () => {
    // Increment the current page when reaching the end of the list
    const nextPage = currentPageRef.current + 10;
    pickImage();
    // Fetch more data based on the new page number
    fetchData(nextPage);
  };

  const fetchData = page => {
    // Perform data fetching logic based on the page number
    console.log(`Fetching data for page ${page}`);
    // ... (replace this with your actual data fetching logic)

    // Update the current page without triggering a re-render
    currentPageRef.current = page;
  };

  data.unshift({node: {isCamera: true}});

  return (
    <View style={styles.container}>
      {openModal ? (
        <View style={styles.listHolder}>
          <FlatList
            data={data}
            renderItem={renderCamera}
            onEndReached={handleEndReached}
            //  onEndReachedThreshold={0.1}
            numColumns={4}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <Header />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.profileStyle}>
                <Text style={styles.initialTextStyle}>
                  {areaName.charAt(0)}
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  fontWeight: 'bold',
                  flex: 1,
                }}>
                {recipientData.name}
              </Text>
              {selectedMessages.length > 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    marginRight: 50,
                  }}>
                  <Ionicons name="arrow-redo-sharp" size={24} color="black" />
                  <FontAwesome name="star" size={24} color="black" />
                  <MaterialIcons
                    onPress={() => deleteMessages(selectedMessages)}
                    name="delete"
                    size={24}
                    color="black"
                  />
                  <Ionicons name="arrow-undo-sharp" size={24} color="black" />
                </View>
              ) : null}
            </View>
          </View>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{flexGrow: 1}}
            onContentSizeChange={handleContentSizeChange}>
            {chatMessages.map((item, index) => {
              if (item.messageType === 'text') {
                const isSelected = selectedMessages.includes(item._id);
                return (
                  <>
                    <TouchableOpacity
                      onLongPress={() => handleSelectMessage(item)}
                      onPress={() => onPressItemDeSelect(item)}
                      key={index}
                      style={[
                        item?.senderId?._id === userDetails._id
                          ? {
                              alignSelf: 'flex-end',
                              backgroundColor: '#807adc',
                              padding: 5,
                              maxWidth: '60%',
                              margin: 10,
                              // borderBottomLeftRadius: 15,
                              // borderBottomRightRadius: 10,
                              // borderTopRightRadius: 10,
                              borderRadius: 10,
                            }
                          : {
                              alignSelf: 'flex-start',
                              backgroundColor: '#B5C0D0',
                              padding: 8,
                              margin: 10,
                              borderRadius: 7,
                              maxWidth: '60%',
                            },

                        isSelected && {
                          width: '100%',
                          backgroundColor: colors.grey,
                          // borderTopLeftRadius: 0,
                          // borderBottomLeftRadius: 20,
                        },
                      ]}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: isSelected ? colors.black : colors.white,
                          textAlign: isSelected ? 'right' : 'left',
                        }}>
                        {item.message}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: 9,
                          color: isSelected ? colors.black : colors.white,
                          marginTop: 5,
                        }}>
                        {formatTime(item.timeStamp)}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              }

              if (item.messageType === 'image') {
                const baseUrl = 'home/bi1466/sowmiya/MessageAssets/';
                const imageUrl = item.imageUrl;
                const filename = imageUrl.split('/').pop();
                const source = {uri: baseUrl + filename};
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      item?.senderId?._id === userDetails._id
                        ? {
                            alignSelf: 'flex-end',
                            backgroundColor: '#807adc',
                            padding: 8,
                            maxWidth: '60%',
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: 'flex-start',
                            backgroundColor: '#B5C0D0',
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: '60%',
                          },
                    ]}>
                    <View>
                      <Image
                        source={source}
                        style={{width: 200, height: 200, borderRadius: 7}}
                      />
                      <Text
                        style={{
                          textAlign: 'right',
                          fontSize: 9,
                          position: 'absolute',
                          right: 10,
                          bottom: 7,
                          color: 'white',
                          marginTop: 5,
                        }}>
                        {formatTime(item?.timeStamp)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>

          <View style={styles.textInputContainer(showEmojiSelector)}>
            <Entypo
              style={{marginRight: 5}}
              name="emoji-happy"
              size={24}
              color={'grey'}
              onPress={() => setShowEmojis(current => !current)}
            />
            <TextInput
              value={chatMessage}
              // onChangeText={text => setMessage(text)}
              onChangeText={text => setChatMessage(text)}
              style={styles.textInputStyle}
              placeholder="Type Your Message"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                marginHorizontal: 8,
              }}>
              <Entypo
                onPress={pickImage}
                style={{marginRight: 5}}
                name="camera"
                size={24}
                color={'grey'}
              />
              <Feather
                style={{marginRight: 5}}
                name="mic"
                size={24}
                color={'grey'}
              />
            </View>

            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => sendMessage('text')}>
              <Text style={styles.sendTextStyle}>Send</Text>
            </TouchableOpacity>
          </View>

          {/* {showEmojis && (
        <EmojiBoard
          viewPagerRef={viewPagerRef}
          onPress={handleEmojiSelect}
          emojiCount={30}
          categoryColor="#009688"
        />
      )} */}

          {/* <EmojiContext.Provider value={{emoji, setEmoji}}>
        <View style={styles.container1}>
          {showEmojis && (
            <View style={styles.emojis}>
              <Tab.Navigator
                tabBarOptions={{
                  indicatorStyle: {backgroundColor: 'red'}, // Set your desired color for the indicator
                }}>
                {Object.keys(emojisData).map(key => (
                  <Tab.Screen
                    component={() => <EmojisTab emojis={emojisData[key]} />}
                    name={emojisData[key][0].char}
                    options={{
                      headerShown: false,
                      swipeEnabled: true,
                    }}></Tab.Screen>
                ))}
              </Tab.Navigator>
            </View>
          )}
        </View>
      </EmojiContext.Provider> */}
          {/* )} */}
        </>
      )}
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  listHolder: {
    borderWidth: 1,
    flex: 1,
    // backgroundColor: colors.red,
  },
  textInputStyle: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  textInputContainer: show => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    marginBottom: show ? 0 : 25,
  }),
  sendBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sendTextStyle: {
    color: colors.white,
    fontFamily: textFontFaceSemiBold,
    fontSize: 16,
  },
  container1: {
    // flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.blue,
  },
  emojis: {
    // position: 'absolute',
    height: 300,
    width: '100%',
    bottom: 0,
    // marginTop: 10,
  },
  profileStyle: {
    width: 35,
    height: 35,
    borderRadius: 25,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: colors.green,
  },
  initialTextStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.white,
  },
  container2: {
    flex: 1,
    backgroundColor: colors.transparentGrey,
    justifyContent: 'flex-end',
  },

  AlertBase: {
    backgroundColor: colors.white,
    width: '100%',
    paddingTop: 25,
    overflow: 'hidden',
    height: '80%',
    // alignItems: "center",
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  fileUploadView: {
    flexDirection: 'row',
  },
  uploadButton: {
    marginHorizontal: 20,
    padding: 10,
  },
});

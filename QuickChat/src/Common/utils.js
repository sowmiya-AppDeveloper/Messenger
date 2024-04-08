import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
    LOG('ERROR ' + JSON.stringify(e));
    return null;
  }
};
export const storeItem = async (key, value) => {
  try {
    // LOG("STORING Key : " + key + " Value : " + value);
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    LOG('ERROR ' + JSON.stringify(e));
    return null;
  }
};

// asynstorage Remove item
export const removeItem = async key => {
  try {
    LOG('Removing Key : ' + key);
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
    LOG('ERROR ' + JSON.stringify(e));
    return null;
  }
};

export const getFirebaseMessageToken = async () => {
  const fcmToken = await firebase().getToken();

  console.log('fireBaseToken =====> ', fcmToken);
  return fcmToken;
};
export const displayNotification = async msg => {
  console.log('displayNotification =====> ', msg);

  //request permission for ios
  await notifee.requestPermission();
  //request channelId for android
  const channelId = await notifee.createChannel({
    id: 'chat app',
    name: 'Quick Notify',
  });

  // display notification with style

  await notifee.displayNotification({
    title: msg.notification.title,
    body: msg.notification.body,

    android: {
      channelId,
      smallIcon: 'ic_launcher',
    },
  });
};

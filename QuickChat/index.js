/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import firebase from '@react-native-firebase/messaging';
import {displayNotification} from './src/Common/utils';
import notifee from '@notifee/react-native';
firebase()
  .registerDeviceForRemoteMessages()
  .then(() => {
    console.log('Appregistered for remote message');
  })
  .catch(err => {
    console.log('remote message failed', err);
  });

///background notification will comes here
firebase().setBackgroundMessageHandler(async notify => {
  console.log('real time background notification ', notify);

  const message = notify;
  displayNotification(message);
});
notifee.onBackgroundEvent(async () => {});

const index = () => {
  useEffect(() => {
    console.log('============================');
    console.log('Welcome to Dish Delight');
    console.log('============================');
  }, []);

  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => index);

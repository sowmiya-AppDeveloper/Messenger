import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {
  BackHandler,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {requestUrl} from '../Common/Constants';
import {getUserDetails} from '../Redux/AuthAction';
import {getItem, storeItem} from '../Common/utils';
import {useDispatch} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {navigationRef} from '../Common/RootNavigation';

const Application = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ])
        .then(result => {
          if (
            result['android.permission.CAMERA'] &&
            result['android.permission.READ_EXTERNAL_STORAGE'] &&
            result['android.permission.WRITE_EXTERNAL_STORAGE'] &&
            result['android.permission.POST_NOTIFICATIONS'] === 'granted'
          ) {
            LOG('Permissions_granted');
            // this.setState({
            //   permissionsGranted: true,
            // });
          } else if (
            result['android.permission.CAMERA'] ||
            result['android.permission.READ_EXTERNAL_STORAGE'] ||
            result['android.permission.WRITE_EXTERNAL_STORAGE'] ||
            result['android.permission.POST_NOTIFICATIONS'] ===
              'never_ask_again'
          ) {
            LOG('Permissions_denied');
            // BackHandler.exitApp();
          } else {
            LOG('PERMISSION ELSE CASE HANDLE HERE');
          }
        })
        .catch(err => {
          LOG('permission granted in catch :', err);
        });
    }
    // hardware back button handler

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );

    getItem('userDetailsToken')
      .then(userDetails => {
        if (userDetails) {
          const decoded = require('jwt-decode')(userDetails);
          const user = decoded._id;

          let json = {
            id: user,
            OnSuccess: response => onSuccess(response),
          };
          console.log('userDetails Found Auto Login : ', json);

          dispatch(getUserDetails(json));
        } else {
          console.log('No userDetails FoundMAYBE');
          setTimeout(() => {
            navigation.navigate('login');
          }, 2000);
        }
      })
      .catch(err => {
        console.log('while getting userDetails in catch : ', err);
      });

    return () => backHandler.remove();
  }, []);

  const onSuccess = res => {
    try {
      console.log('while getting userDetails in catch1111111 : ', res);

      if (res.message === 'success') {
        try {
          storeItem('userDetailsToken', res.token);

          navigation.navigate('home');
        } catch (error) {
          console.error('Error in onSuccess:', error.message || error);
        }
      } else if (res.error == 'No user found') {
        navigation.navigate('login');
      }
    } catch (error) {
      console.error('Error in onSuccess:', error.message || error);
    }
  };

  const handleBackButtonClick = () => {
    //var routeName = Actions.currentScene;
    // LOG('BACK pressed ON : ' + routeName);
    //backPressHandler(routeName);
    return true;
  };
  return (
    <View>
      <AnimatedLottieView
        speed={1}
        style={{
          height: '80%',
          width: '80%',
          borderWidth: 1,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        source={require('../../Assets/Json/splash1.json')}
        loop
        autoPlay
        // resizeMode={'contain'}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
        }}>
        Welcome to Quick Chat
      </Text>
    </View>
  );
};

export default Application;

const styles = StyleSheet.create({});

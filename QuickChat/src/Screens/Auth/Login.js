import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors} from '../../Common/colors';
import {textFontFace, textFontFaceSemiBold} from '../../Common/styles';
import {getFirebaseMessageToken, storeItem} from '../../Common/utils';
import {dispatchLogin} from '../../Redux/AuthAction';

const Login = () => {
  const [email, setEmail] = useState('kamal@gamil.com');
  const [password, setPassword] = useState('1234567');
  const [storeFcmToken, setStoreFcmToken] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await getFirebaseMessageToken();
    setStoreFcmToken(token);
  };
  const dispatch = useDispatch();
  const onSuccess = res => {
    if (res.message == 'success') {
      storeItem('userDetailsToken', res.token);

      navigation.navigate('home');
    }
  };
  const onPressLogin = () => {
    var jsonData = {
      email: email,
      password: password,
      fcmToken: storeFcmToken,
      OnSuccess: response => onSuccess(response),
    };
    dispatch(dispatchLogin(jsonData));
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={{marginTop: 100}}>
          <Text style={styles.signInText}>Sign In</Text>
          <Text style={[styles.signInText, {color: colors.black}]}>
            Sign In to Your Account
          </Text>
        </View>
        <View style={{marginTop: 50}}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: textFontFace,
                color: colors.grey,
              }}>
              Email
            </Text>
            <TextInput
              placeholderTextColor={colors.black}
              placeholder="enter your email"
              value={email}
              style={styles.TextInputStyle(email)}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: textFontFace,
                color: colors.grey,
              }}>
              Password
            </Text>
            <TextInput
              placeholderTextColor={colors.black}
              placeholder="enter your password"
              value={password}
              style={styles.TextInputStyle(email)}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={onPressLogin}
          style={{
            width: 200,
            backgroundColor: colors.blue,
            padding: 15,
            marginTop: 50,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              fontFamily: textFontFaceSemiBold,
              textAlign: 'center',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('register')}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: colors.grey, fontSize: 16}}>
            Don't Have an account? Sign up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    alignItems: 'center',
  },
  signInText: {
    color: colors.blue,
    fontSize: 17,
    fontFamily: textFontFace,
    textAlign: 'center',
  },
  TextInputStyle: email => ({
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
    fontSize: email ? 18 : 18,
  }),
});

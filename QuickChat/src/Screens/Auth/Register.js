import {
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../Common/colors';
import {textFontFace, textFontFaceSemiBold} from '../../Common/styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {dispatchRegisterUser} from '../../Redux/AuthAction';
import {getFirebaseMessageToken} from '../../Common/utils';

const Register = () => {
  const [email, setEmail] = useState('kamal@gamil.com');
  const [name, setName] = useState('kamal');
  const [password, setPassword] = useState('1234567');
  const [storeFcmToken, setStoreFcmToken] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await getFirebaseMessageToken();
    setStoreFcmToken(token);
  };
  const onSuccess = res => {
    if (res.status == 'success') {
      navigation.goBack();
    }
  };
  const handleRegister = () => {
    var jsonData = {
      name: name,
      email: email,
      password: password,
      fcmToken: storeFcmToken,
      OnSuccess: response => onSuccess(response),
    };
    dispatch(dispatchRegisterUser(jsonData));
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={{marginTop: 100}}>
          <Text style={styles.signInText}>Register</Text>
          <Text style={[styles.signInText, {color: colors.black}]}>
            Register to Your Account
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
              Name
            </Text>
            <TextInput
              placeholderTextColor={colors.black}
              placeholder="enter your name"
              style={styles.TextInputStyle(name)}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
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
              style={styles.TextInputStyle(email)}
              value={email}
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
              style={styles.TextInputStyle(password)}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleRegister}
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
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: colors.grey, fontSize: 16}}>
            Already Have an account? Sign in
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

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

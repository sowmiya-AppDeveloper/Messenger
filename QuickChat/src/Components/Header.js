import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {textFontFace, textFontFaceSemiBold} from '../Common/styles';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Header = props => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onPressBack}>
      <Ionicons name="chevron-back-sharp" size={24} />
      <Text
        style={{
          fontFamily: textFontFaceSemiBold,
          fontSize: 20,
          marginHorizontal: 5,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({});

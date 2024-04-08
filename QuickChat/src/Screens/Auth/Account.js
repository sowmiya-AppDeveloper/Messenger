import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../../Components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../Common/colors';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {
  textFontFace,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from '../../Common/styles';
import RBSheet from 'react-native-raw-bottom-sheet';

const {height, width} = Dimensions.get('screen');
const Account = () => {
  const userDetails = useSelector(({auth}) => auth.userDetails);
  const [from, setFrom] = useState('');
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  const editName = from => {
    setFrom(from);
    openBottomSheet();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Header title={'Profile'} />
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../Assets/Images/user.png')}
            style={styles.image}
          />
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 25,
            backgroundColor: '#B6C4B6',
            height: 40,
            width: 40,
            alignSelf: 'center',
            marginTop: -55,
            left: 60,
            justifyContent: 'center',
          }}>
          <Entypo
            // onPress={pickImage}
            style={{textAlign: 'center'}}
            name="camera"
            size={26}
            color={'black'}
          />
        </TouchableOpacity>
        <View style={styles.contentStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.transparent,
              }}>
              <MaterialCommunityIcons name="account" size={26} color={'grey'} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  color: 'grey',
                }}>
                Name
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 25,
                fontFamily: textFontFaceMedium,
                flex: 1,
              }}>
              {userDetails.name}
            </Text>
            <TouchableOpacity onPress={() => editName('name')}>
              <MaterialIcons
                style={{}}
                name="mode-edit"
                size={24}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: colors.transparent,
              }}>
              <Feather name="info" size={26} color={'grey'} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 16,
                  color: 'grey',
                }}>
                About
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 25,
                fontFamily: textFontFaceMedium,
                flex: 1,
              }}>
              {userDetails.name}
            </Text>
            <TouchableOpacity onPress={() => editName('about')}>
              <MaterialIcons
                style={{}}
                name="mode-edit"
                size={24}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <RBSheet
          ref={bottomSheetRef}
          // closeOnDragDown
          keyboardAvoidingViewEnabled={true}
          height={width / 2}
          customStyles={{}}>
          <View style={{padding: 16}}>
            <Text style={{fontSize: 16, color: colors.black}}>
              {from == 'about' ? 'Add About' : 'Enter your name'}
            </Text>
            <TouchableOpacity onPress={closeBottomSheet}>
              <TextInput
                placeholder={from == 'about' ? 'about' : 'name'}
                style={{borderBottomWidth: 1, borderBottomColor: colors.grey}}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={{marginHorizontal: 25}}
                onPress={closeBottomSheet}>
                <Text style={{fontSize: 16, color: colors.black}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontSize: 16, color: colors.black}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  image: {
    height: width / 2.5,
    width: width / 2.5,
    alignSelf: 'center',
  },
  imageContainer: {
    height: width / 2.5,
    width: width / 2.5,
    alignSelf: 'center',
    marginTop: 50,
    borderWidth: 2.5,
    borderRadius: 150,
    justifyContent: 'center',
    borderColor: colors.baseSecondary,
  },
  contentStyle: {
    marginVertical: 50,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.transparent,
  },
});

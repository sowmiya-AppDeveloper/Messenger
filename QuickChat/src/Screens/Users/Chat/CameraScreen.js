import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import {colors} from '../../../Common/colors';
import {View} from 'react-native';
import {Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchCamera} from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');
const CameraScreen = props => {
  const handleCameraPress = () => {
    props.handleCameraPress();
  };

  const onFileUploadPress = galImg => {
    props.onFileUploadPress(galImg);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageHolder}>
        {props.item.node.isCamera == true ? (
          <TouchableOpacity
            style={{
              resizeMode: 'cover',
              height: undefined,
              width: undefined,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleCameraPress}>
            <Entypo
              style={{marginRight: 5}}
              name="camera"
              size={24}
              color={'grey'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onFileUploadPress(props.item.node)}>
            <Image
              style={styles.image}
              source={{uri: props.item.node.image.uri}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 4,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  imageHolder: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    height: undefined,
    width: undefined,
    aspectRatio: 1,
  },
});

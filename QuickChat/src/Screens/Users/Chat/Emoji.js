import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import EmojiContext from '../../../../context';

const Emoji = props => {
  const {setEmoji} = useContext(EmojiContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setEmoji(props.emoji)}>
      <Text style={styles.text}>{props.emoji}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default Emoji;

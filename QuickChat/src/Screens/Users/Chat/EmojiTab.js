import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import Emoji from './Emoji';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const EmojisTab = props => {
  const emojis = props.emojis;

  const render = ({item}) => {
    return <Emoji emoji={item.char} />;
  };

  // Create a data provider
  const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
    emojis,
  );

  // Create a layout provider for the RecyclerListView
  const layoutProvider = new LayoutProvider(
    index => 0, // Only one type of view in this example, so the type is always 0
    (_, dim) => {
      dim.width = 40; /* calculate your item width */
      dim.height = 40; /* calculate your item height */
    },
  );

  // Render each item in the RecyclerListView
  const renderItem = (type, data) => (
    <View
      style={
        {
          /* your item styles */
        }
      }>
      <Text>{data.char}</Text>
    </View>
  );
  return (
    // <FlatList
    //   style={styles.container}
    //   data={emojis}
    //   renderItem={render}
    //   keyExtractor={item => item.char}
    //   numColumns={8}
    // />
    <RecyclerListView
      style={{flex: 1}}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EmojisTab;

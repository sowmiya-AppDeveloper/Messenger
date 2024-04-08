import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './src/Screens/Home';
import Router from './src/Router/Router';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <StatusBar
          animated={true}
          // backgroundColor={colors.iconBlue}
          barStyle="light-content"
        />
        <View style={{height: '100%'}}>
          <Router />
        </View>
        {/* <FlashMessage position={"top"} /> */}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

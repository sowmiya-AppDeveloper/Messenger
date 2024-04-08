import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../Common/RootNavigation';
import Home from '../Screens/Home';
import Application from '../app/Application';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import {View} from 'react-native';
import FriendsScreen from '../Screens/Users/FriendsScreen';
import Chat from '../Screens/Users/Chat/Chat';
import ChatMessage from '../Screens/Users/Chat/ChatMessage';
import Account from '../Screens/Auth/Account';

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="application">
        <Stack.Screen
          name={'home'}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'application'}
          component={Application}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'login'}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'register'}
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'friendScreen'}
          component={FriendsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'chats'}
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'messages'}
          component={ChatMessage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'account'}
          component={Account}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

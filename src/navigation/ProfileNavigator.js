import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '~/screens/ProfileScreen';
import MessagesScreen from '~/screens/ProfileScreen/MessagesScreen';
import {HeaderRight, HeaderLeft} from '~/components/Header';

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureDirection: 'horizontal',
      title: '',
      headerLeft: HeaderLeft,
      headerRight: props => <HeaderRight {...props} />,
    }}>
    <Stack.Screen name="MyProfile" component={ProfileScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;

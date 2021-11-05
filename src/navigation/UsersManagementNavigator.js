import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UsersManagementScreen from '~/screens/UsersManagementScreen';
import {HeaderRight, HeaderLeft} from '~/components/Header';

const Stack = createStackNavigator();

const UsersManagementNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureDirection: 'horizontal',
      title: '',
      headerLeft: HeaderLeft,
      headerRight: props => <HeaderRight {...props} />,
    }}>
    <Stack.Screen name="UserManagement" component={UsersManagementScreen} />
  </Stack.Navigator>
);

export default UsersManagementNavigator;

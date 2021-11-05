import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '~/screens/UserScreen/user';
import CompanyScreen from '~/screens/UserScreen/company';
import {HeaderRight, HeaderLeft} from '~/components/Header';

const Stack = createStackNavigator();

const UserNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureDirection: 'horizontal',
      title: '',
      headerLeft: HeaderLeft,
      headerRight: props => <HeaderRight {...props} />,
    }}>
    <Stack.Screen name="User" component={UserScreen} />
    <Stack.Screen name="Company" component={CompanyScreen} />
  </Stack.Navigator>
);

export default UserNavigator;

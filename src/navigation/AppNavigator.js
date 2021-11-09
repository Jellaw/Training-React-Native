import React from 'react';
import ProjectNavigator from './ProjectNavigator';
import ProjectConfigNavigator from './ProjectConfigNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '~/screens/DashboardScreen';
import BuildingNodes from '~/screens/ProjectScreen/nodes';
import ProjecConfigtNavigator from './ProjectConfigNavigator';
import QrCode from '~/screens/DeviceScreen/qrcode';
import DeviceDetail from '~/screens/DeviceScreen/device-detail';
import AddDevice from '~/screens/DeviceScreen/add-device';
import AddDevEui from '~/screens/DeviceScreen/add-deveui';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const AppNavigator = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Root" component={RootNavigator} />
      <Stack.Screen name="Nodes" component={BuildingNodes} />
      <Stack.Screen name="ProjectConfig" component={ProjecConfigtNavigator} />
      <Stack.Screen name="Qrcode" component={QrCode} />
      <Stack.Screen
        options={{cardStyleInterpolator: forFade}}
        name="DeviceDetail"
        component={DeviceDetail}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: forFade}}
        name="AddDevice"
        component={AddDevice}
      />
      <Stack.Screen
        options={{cardStyleInterpolator: forFade}}
        name="AddDevEui"
        component={AddDevEui}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Project" component={ProjectNavigator} />
      <Stack.Screen name="ProjectConfig" component={ProjectConfigNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

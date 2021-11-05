import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import MyIcon from '~/components/MyIcon';
import colors from '~/assets/colors';
import {useNavigation} from '@react-navigation/native';
import ProjectConfigScreen from '~/screens/ProjectConfigureScreen';
import fonts from '~/assets/fonts';
import BuildingConfig from '~/screens/ProjectConfigureScreen/building-config';
import routes from './routes';
import WallConfig from '~/screens/ProjectConfigureScreen/wall-config';
import LevelConfig from '~/screens/ProjectConfigureScreen/level-config';
import BayConfig from '~/screens/ProjectConfigureScreen/bay-config';

const Stack = createStackNavigator();

const ProjecConfigtNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'Configure Project',
        headerTitleStyle: {
          ...fonts.type.bold(20),
        },
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.PROJECT)}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <MyIcon name="times" size={20} color={colors.purple} />
          </TouchableOpacity>
        ),
        headerStyle: {
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowOffset: {
            x: 0,
            y: 0,
          },
          shadowRadius: 1.5,
          elevation: 1.5,
        },
      }}>
      <Stack.Screen name="ProjectConfigRoot" component={ProjectConfigScreen} />
      <Stack.Screen name="BuildingConfig" component={BuildingConfig} />
      <Stack.Screen name="WallConfig" component={WallConfig} />
      <Stack.Screen name="LevelConfig" component={LevelConfig} />
      <Stack.Screen name="BayConfig" component={BayConfig} />
    </Stack.Navigator>
  );
};

export default ProjecConfigtNavigator;

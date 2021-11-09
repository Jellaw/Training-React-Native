import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import ProjectScreen from '~/screens/ProjectScreen';
import {TouchableOpacity} from 'react-native';
import MyIcon from '~/components/MyIcon';
import colors from '~/assets/colors';
import {SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactScreen from '~/screens/ContactScreen';
import BuildingDetail from '~/screens/ProjectScreen/building';
import MyRoutes from './routes';
import ROLES from '~/constants/permissions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProjectNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen name="Main" component={ProjectTab} />
      <Stack.Screen name="Building" component={BuildingDetail} />
    </Stack.Navigator>
  );
};

const ProjectTab = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={ProjectScreen} />
      <Tab.Screen name="User Management" component={ContactScreen} />
      <Tab.Screen name="qrcode" component={ContactScreen} />
    </Tab.Navigator>
  );
};

// const ProjectStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         gestureDirection: 'horizontal',
//       }}>
//       <Stack.Screen name="Main" component={ProjectScreen} options={{}} />
//       <Stack.Screen name="Building" component={BuildingDetail} />
//       <Stack.Screen name="Nodes" component={BuildingNodes} />
//     </Stack.Navigator>
//   );
// };

const TabBar = ({state, navigation}) => {
  const {routes} = state;
  const {roles} = useSelector(state => state.me);
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 8,
        height: 77,
      }}>
      {routes.map((route, index) => {
        const focused = index === state.index;
        let icon, size;
        // const isHome =
        //   index === 1 &&
        //   index === state.index &&
        //   (routes[index].state?.index || 0) === 0;
        switch (index) {
          case 0:
            icon = 'home';
            size = 24;
            break;
          case 1:
            icon = 'address-book';
            size = 24;
            break;
          case 2:
            icon = 'qrcode';
            size = 24;
            break;
        }

        return (
          <TouchableOpacity
            onPress={() => {
              if (index === 0) {
                navigation.pop();
                return;
              }
              if (index === 2) {
                roles.includes(ROLES.PROJECT_NODE_CHECK) &&
                  navigation.navigate(MyRoutes.QRCODE);
                return;
              }
              roles.includes(ROLES.CONTACT_GET_LIST) &&
                navigation.navigate(route.name);
            }}
            key={route.key}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <MyIcon
              name={icon}
              // solid={index == 1 ? false : focused}
              light
              size={size}
              color={
                index === 0
                  ? colors.grey
                  : focused
                  ? colors.purple
                  : colors.grey
              }
            />
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default ProjectNavigator;

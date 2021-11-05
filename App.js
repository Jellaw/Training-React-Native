import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import navigationTheme from '~/navigation/navigationTheme';
import AppNavigator from '~/navigation/AppNavigator';
import OfflineNotice from '~/components/OfflineNotice';
import AuthNavigator from '~/navigation/AuthNavigator';
import codePush from 'react-native-code-push';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {ErrorCenter} from '~/components/alert/ErrorCenter';
import {NotificationCenter} from '~/components/alert/NotificationCenter';

function App() {
  const {loggedIn} = useSelector(state => state.auth);
  return (
    <SafeAreaProvider>
      <OfflineNotice />
      <ErrorCenter />
      <NotificationCenter />
      <RootSiblingParent>
        <NavigationContainer theme={navigationTheme}>
          {loggedIn ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}

let codePushOptions = {
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(App);

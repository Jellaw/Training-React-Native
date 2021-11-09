import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import navigationTheme from '~/navigation/navigationTheme';
import AppNavigator from '~/navigation/AppNavigator';
import OfflineNotice from '~/components/OfflineNotice';
import AuthNavigator from '~/navigation/AuthNavigator';
import codePush from 'react-native-code-push';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ErrorCenter } from '~/components/alert/ErrorCenter';
import { NotificationCenter } from '~/components/alert/NotificationCenter';

function App() {
  const { loggedIn } = useSelector(state => state.auth);

  const iosFCMPermissionRequest = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const notificationListener = () => {
    const unsubscribe = messaging().onMessage(async ({ notification }) => {
      const { body, title, data } = notification;
      Alert.alert(title, body, [
        {
          text: "Close",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Acknowledge", onPress: () => {
            //TODO: Process payload to Acknowledge
            console.log("Acknowledge Pressed", data);
          }
        }
      ]);
    });

    return unsubscribe;
  }

  useEffect(() => {
    iosFCMPermissionRequest();
    return notificationListener();
  }, []);

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

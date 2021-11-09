/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from '~/store';
import { logInWithToken } from '~/store/auth/actions';
import tokenStorage from '~/services/auth/token-storage';
import messaging from '@react-native-firebase/messaging';

(async function runApp() {

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const token = await tokenStorage.getToken();
  const deviceToken = await tokenStorage.getDeviceToken();
  if (token) {
    await store.dispatch(logInWithToken({ token, deviceToken }));
  }
})();

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Wrapper);

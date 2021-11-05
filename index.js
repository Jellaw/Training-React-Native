/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from '~/store';
import {logInWithToken} from '~/store/auth/actions';
import tokenStorage from '~/services/auth/token-storage';

(async function runApp() {
  const token = await tokenStorage.getToken();
  if (token) {
    await store.dispatch(logInWithToken({token}));
  }
})();

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Wrapper);

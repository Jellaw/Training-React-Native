import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_STORE_TOKEN_KEY} from '~/config';

const setToken = async token => {
  await AsyncStorage.setItem(LOCAL_STORE_TOKEN_KEY, token);
  return token;
};

const getToken = async () => {
  const value = await AsyncStorage.getItem(LOCAL_STORE_TOKEN_KEY);
  return value;
};

const removeToken = () => {
  return AsyncStorage.removeItem(LOCAL_STORE_TOKEN_KEY);
};

export default {getToken, removeToken, setToken};

import React, {useEffect} from 'react';
import {View} from 'react-native';
import colors from '~/assets/colors';
import {useSelector} from 'react-redux';
import AppText from '~/components/AppText';
import store from '~/store';
import styles from './styles';

const typeAlert = {
  SUCCESS: 'Success',
  ERROR: 'Errors',
  WARNING: 'Warning',
  INFO: 'More information',
};

const typeColor = {
  SUCCESS: colors.green,
  ERROR: colors.red,
  WARNING: colors.orange,
  INFO: colors.blue,
};

export const notification = (type, message) => {
  return store.dispatch({
    type: 'error/notification',
    payload: {
      type: type,
      message: message,
    },
  });
};

export const NotificationCenter = () => {
  const {noti, isNoti, type} = useSelector(state => state.error);

  useEffect(() => {
    setTimeout(() => {
      store.dispatch({type: 'error/dropNoti'});
    }, 3500);
  }, [isNoti]);

  return (
    <>
      {isNoti && (
        <View
          style={[
            styles.notiBody,
            {
              backgroundColor: typeColor[type],
            },
          ]}>
          <AppText style={styles.notiTitle} text={typeAlert[type]} />
          <AppText style={styles.notiText} text={noti} />
        </View>
      )}
    </>
  );
};

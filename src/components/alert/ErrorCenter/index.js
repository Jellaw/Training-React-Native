import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {isArray} from 'validate.js';
import AppText from '~/components/AppText';
import {isEmpty} from '~/helpers/validate';
import store from '~/store';
import styles from './styles';

export const ErrorCenter = () => {
  const {message, isErr} = useSelector(state => state.error);
  const [noti, setNoti] = useState('');
  const [field, setField] = useState('');

  useEffect(() => {
    setField(
      !isEmpty(message.data) && isArray(message.data)
        ? message.data[0].arg + ':'
        : '',
    );
    setNoti(
      !isEmpty(message.data)
        ? !isEmpty(message.data[0])
          ? message.data[0].reason
          : message.data.message
        : message.message,
    );
    setTimeout(() => {
      store.dispatch({type: 'error/dropError'});
    }, 3500);
  }, [isErr]);

  return (
    <>
      {isErr && (
        <View style={styles.errorBody}>
          {!isEmpty(field) && (
            <AppText style={styles.errorField} text={field} />
          )}
          <AppText style={styles.errorText} text={noti} />
        </View>
      )}
    </>
  );
};

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {useNetInfo} from '@react-native-community/netinfo';

import AppText from './AppText';
import colors from '~/assets/colors';

function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText text="No Internet Connection" style={styles.text} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: Constants.statusBarHeight,
    width: '100%',
    zIndex: 1,
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;

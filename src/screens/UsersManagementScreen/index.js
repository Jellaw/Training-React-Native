import React from 'react';
import {ScrollView} from 'react-native';
import AppText from '~/components/AppText';
import Screen from '~/components/Screen';
import styles from './styles';

function UsersManagementScreen() {
  return (
    <ScrollView>
      <Screen style={styles.container}>
        <AppText text="Hello" />
      </Screen>
    </ScrollView>
  );
}

export default UsersManagementScreen;

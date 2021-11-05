import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '~/assets/colors';
import styles from './styles';

import {ASSET_URL} from '~/config';

export const HeaderLeft = props => (
  <View style={{marginLeft: 10}}>
    <SvgUri
      {...props}
      width="150"
      height="150"
      uri={`${ASSET_URL}/images/logo.svg`}
    />
  </View>
);

export const HeaderRight = () => {
  return (
    <View style={styles.boxIconLeft}>
      <TouchableOpacity>
        <MaterialCommunityIcons
          style={styles.icon}
          name="headphones"
          color={colors.white}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          //TODO: LOGOUT
        }}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="logout"
          color={colors.white}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

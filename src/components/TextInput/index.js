import React from 'react';
import {View, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import colors from '~/assets/colors';

function AppTextInput({icon, width = '100%', ...props}) {
  return (
    <View style={[styles.container, {width}, props.colors]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.grey}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.grey}
        style={[styles.input, props.styleInput]}
        {...props}
      />
    </View>
  );
}

export default AppTextInput;

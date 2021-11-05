import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '~/assets/colors';
import styles from './styles';

export const ButtonLogin = ({
  title,
  onPress,
  color = 'primary',
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors[color]}, props.stylesBtn]}
      onPress={onPress}>
      <Text style={[styles.btnLogin, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ButtonLink = ({title, onPress, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.white}, props.stylesBtn]}
      onPress={onPress}>
      <Text style={[styles.btnLink, props.styles]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ButtonColor = ({title, onPress, color, ...props}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}, props.stylesBtn]}
      onPress={onPress}>
      <Text style={props.styles}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ButtonIcon = ({title, onPress, icon, ...props}) => {
  return (
    <Button
      icon={
        <MaterialCommunityIcons
          name={icon}
          size={props.sizeIcon || 15}
          color={props.colorIcon || colors.white}
        />
      }
      buttonStyle={[styles.button, props.style]}
      title={title}
      onPress={onPress}
      {...props}
    />
  );
};

import React from 'react';
import {View} from 'react-native';
import {Overlay} from 'react-native-elements';
import styles from './styles';

export const Popup = props => {
  const {isVisible, children, height} = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="red"
      overlayStyle={[styles.overlayContainer, {height: height}]}>
      <View style={styles.overlayBody}>{children}</View>
    </Overlay>
  );
};

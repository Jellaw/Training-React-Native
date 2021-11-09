import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Text from './Text';

function PickerItem({index, label, onPress}) {
  return (
    <TouchableOpacity key={index} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from './Text';
import colors from '~/assets/colors';
import PickerItem from './PickerItem';
import Screen from './Screen';
import fonts from '~/assets/fonts';
import {isEmpty} from 'validate.js';

function AppPicker({
  addAction,
  icon,
  data,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = '100%',
  disabled,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const onChange = item => {
    setModalVisible(false);
    onSelectItem(item);
  };
  return (
    <>
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={() => setModalVisible(true)}>
        <View
          style={[
            styles.container,
            disabled ? {backgroundColor: colors.lightgrey} : '',
            {width},
          ]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem && !isEmpty(data) ? (
            <Text style={styles.text}>
              {data.find(item => item.id == selectedItem).applicationName ||
                data.find(item => item.id == selectedItem).devEui ||
                data.find(item => item.id == selectedItem).name ||
                ''}
            </Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          {addAction && addAction()}
          <FlatList
            data={data}
            extraData={data}
            numColumns={numberOfColumns}
            renderItem={({item, index}) => (
              <PickerItemComponent
                index={index}
                label={item.name || item.applicationName || item.devEui}
                onPress={() => onChange(item)}
              />
            )}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9EAF0',
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    ...fonts.type.base(16, colors.grey),
    flex: 1,
  },
  text: {
    ...fonts.type.base(16),
    flex: 1,
  },
});

export default AppPicker;

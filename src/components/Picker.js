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
  icon,
  data,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = '100%',
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const onChange = item => {
    setModalVisible(false);
    onSelectItem(item);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, {width}]}>
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
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={data}
            keyExtractor={(item, index) => {
              `${item.id}_${index}`;
            }}
            numColumns={numberOfColumns}
            renderItem={({item, index}) => (
              <PickerItemComponent
                key={index}
                label={item.name || item.applicationName || item.devEui}
                onPress={() => onChange(item)}
              />
            )}
          />
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

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import MyIcon from '~/components/MyIcon';
import Screen from '~/components/Screen';
import {SearchBarBlock} from '~/components/SearchBar';
import {NODE_STATUS} from '~/constants/masterData';
import FilterNode from './filter-node';
import styles from './styles';

const dot = (color, size = 6, border = 2) => {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    shadowOffset: {
      x: 0,
      y: 0,
    },
    shadowRadius: border,
    shadowColor: color,
    shadowOpacity: 0.14,
    marginRight: 2,
  };
};

function BuildingNodes(props) {
  const {route} = props;
  const navigation = useNavigation();
  // const [data, setData] = useState([...Array(20)]);
  const {data, name} = route.params || [];
  const [currentFilter, setFilter] = useState(null);
  const [visible, setVisible] = useState(false);

  const onChooseFilter = type => {
    setFilter(type);
    setVisible(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          paddingHorizontal: 16,
        }}>
        {item.status == NODE_STATUS.ACTIVE && (
          <View style={{...dot(colors.green, 8, 3), marginRight: 10}} />
        )}
        {item.status == NODE_STATUS.ALERT && (
          <View style={{...dot(colors.red, 8, 3), marginRight: 10}} />
        )}
        {item.status == NODE_STATUS.PAUSE && (
          <View style={{...dot(colors.grey, 8, 3), marginRight: 10}} />
        )}
        {item.status == NODE_STATUS.CHECK && (
          <View style={{...dot(colors.orange, 8, 3), marginRight: 10}} />
        )}
        <Text style={{...fonts.type.base(15), flex: 1}}>{item.name}</Text>
      </View>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        contentContainerStyle={{paddingVertical: 16}}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  return (
    <Screen>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <Text style={{...fonts.type.bold(34), marginBottom: 24}}>{name}</Text>
        <SearchBarBlock placeholder="Search Node">
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              ...styles.smallBtn,
              backgroundColor: colors.purple,
              borderRadius: 14,
            }}>
            <MyIcon name="sliders-h" size={20} color="white" />
          </TouchableOpacity>
        </SearchBarBlock>
        {renderList()}
      </View>
      <FilterNode
        visible={visible}
        selectedType={currentFilter}
        onConfirm={onChooseFilter}
        onClose={() => setVisible(false)}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 45,
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: colors.mediumgrey,
          paddingTop: 16,
        }}>
        <Text style={{...fonts.type.bold(16, colors.purple)}}>Close</Text>
      </TouchableOpacity>
    </Screen>
  );
}

export default BuildingNodes;

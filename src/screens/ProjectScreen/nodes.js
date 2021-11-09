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
import routes from '~/navigation/routes';

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
  const {data, name, projectName} = route.params || [];
  const [currentFilter, setCurrentFilter] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [dataSearch, setDataSearch] = useState('');

  const onChooseFilter = type => {
    setCurrentFilter(type);

    if (currentSearch) {
      setDataSearch(
        (data || []).filter(character => {
          return (
            character.status == type &&
            character.name.toLowerCase().includes(currentSearch.toLowerCase())
          );
        }),
      );
      return setVisible(false);
    }

    setDataSearch(
      (data || [])
        .filter(item => Number(item.status) === type)
        .map(item => item),
    );
    setVisible(false);
  };
  const onChooseSearch = query => {
    if (currentFilter !== '') {
      setDataSearch(
        (data || []).filter(character => {
          return (
            character.status == currentFilter &&
            character.name.toLowerCase().includes(query.toLowerCase())
          );
        }),
      );
      return setVisible(false);
    }

    setDataSearch(
      (data || []).filter(character => {
        return character.name.toLowerCase().includes(query.toLowerCase());
      }),
    );
    setVisible(false);
  };

  const resetFilter = () => {
    setCurrentFilter('');
    setCurrentSearch('');
    setDataSearch('');
    setVisible(false);
  };

  const handleGoToScafollfing = item => {
    navigation.navigate(routes.PROJECT, {
      screen: routes.BUILDING_DETAIL,
      params: {
        projectName: projectName,
        buildingId: item.buildingId,
        wallId: item.wallId,
        levelName: item.levelName,
        bayName: item.bayName,
      },
    });
  };
  const renderItem = ({item, index}) => {
    return (
      item.isDevices &&
      item.status !== null && (
        <TouchableOpacity
          onPress={() => handleGoToScafollfing(item)}
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            paddingHorizontal: 16,
          }}>
          {Number(item.status) === NODE_STATUS.ACTIVE && (
            <View style={{...dot(colors.green, 8, 3), marginRight: 10}} />
          )}
          {Number(item.status) === NODE_STATUS.ALERT && (
            <View style={{...dot(colors.red, 8, 3), marginRight: 10}} />
          )}
          {Number(item.status) === NODE_STATUS.PAUSE && (
            <View style={{...dot(colors.grey, 8, 3), marginRight: 10}} />
          )}
          {Number(item.status) === NODE_STATUS.CHECK && (
            <View style={{...dot(colors.orange, 8, 3), marginRight: 10}} />
          )}
          <Text style={{...fonts.type.base(15), flex: 1}}>{item.name}</Text>
        </TouchableOpacity>
      )
    );
  };

  const renderList = () => {
    return (
      <FlatList
        contentContainerStyle={{paddingVertical: 16}}
        data={dataSearch || data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  return (
    <Screen>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <Text style={{...fonts.type.bold(34), marginBottom: 24}}>{name}</Text>
        <SearchBarBlock
          value={currentSearch}
          onChangeText={setCurrentSearch}
          onSearch={onChooseSearch}
          placeholder="Search Node">
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
        reset={resetFilter}
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

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import MyIcon from '~/components/MyIcon';
import ProjectList from './list';
import ProjectScaffolding from './scaffolding';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import routes from '~/navigation/routes';
import {LayoutAnimation} from 'react-native';
import {NODE_STATUS} from '~/constants/masterData';
import ROLES from '~/constants/permissions';
import {getNodeInDeviceLocationTree} from '~/helpers/common';

const tagStyle = color => ({
  height: 16,
  backgroundColor: `${color}33`,
  borderRadius: 8,
  marginLeft: 5,
  paddingHorizontal: 5,
  justifyContent: 'center',
});

function BuildingDetail(props) {
  const {navigation, route} = props;
  const [isList, setIsList] = React.useState(true);
  const [currentWall, setCurrentWall] = React.useState(null);
  const [currentNode, setCurrentNode] = React.useState(null);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const {building, projectName, buildingId, wallId, levelName, bayName} =
    route.params || {};
  const {roles} = useSelector(state => state.me);
  const {obj} = useSelector(state => state.project);
  const [buildingData, setBuildingData] = useState({});

  useEffect(() => {
    if (buildingId) {
      getNodeInDeviceLocationTree(obj.deviceLocationTrees, buildingId, obj =>
        setBuildingData(obj),
      );
      onNodePress(
        currentWall || wallId,
        `${currentWall || wallId}-${levelName}-${bayName}`,
      );
      return;
    }
    getNodeInDeviceLocationTree(obj.deviceLocationTrees, building.id, obj =>
      setBuildingData(obj),
    );
  }, [obj, buildingId]);

  const onNodePress = (wallId, node) => {
    setCurrentWall(wallId);
    setCurrentNode(node);
    setIsList(false);
    setSelectedItems([wallId]);
  };

  const onWallToggle = wall => {
    const index = selectedItems.findIndex(i => i === wall);
    if (index >= 0) {
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push(wall);
    }
    LayoutAnimation.easeInEaseOut();
    setSelectedItems([...selectedItems]);
  };

  const renderTag = (title, color, value) => {
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
        <Text style={{...fonts.type.bold(12, color)}}>{title}</Text>
        <View
          style={{
            ...tagStyle(color),
          }}>
          <Text style={{...fonts.type.medium(12, color)}}>{value}</Text>
        </View>
      </View>
    );
  };

  const renderStatus = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16,

          flexDirection: 'row',
        }}>
        {renderTag(
          'Alert',
          colors.red,
          ((buildingData || {}).statusCounter || {})[NODE_STATUS.ALERT] || 0,
        )}
        {renderTag(
          'Check',
          colors.orange,
          ((buildingData || {}).statusCounter || {})[NODE_STATUS.CHECK] || 0,
        )}
        {renderTag(
          'Pause',
          colors.darkgrey,
          ((buildingData || {}).statusCounter || {})[NODE_STATUS.PAUSE] || 0,
        )}
        {renderTag(
          'Active',
          colors.green,
          ((buildingData || {}).statusCounter || {})[NODE_STATUS.ACTIVE] || 0,
        )}
      </View>
    );
  };

  const renderBottomBar = () => {
    return (
      <View style={{flexDirection: 'row', height: 45}}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MyIcon name="arrow-left" size={24} color={colors.grey} light />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsList(true)}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MyIcon
            name="list"
            size={24}
            color={isList ? colors.purple : colors.grey}
            light
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsList(false)}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MyIcon
            name="th"
            solid={!isList}
            size={24}
            color={!isList ? colors.purple : colors.grey}
            light
          />
        </TouchableOpacity>
        {roles.includes(ROLES.PROJECT_NODE_CHECK) && (
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.QRCODE)}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <MyIcon name="qrcode" size={24} color={colors.grey} light />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SafeAreaView
        style={{position: 'absolute', right: 16, top: 0, zIndex: 9999}}>
        {roles.includes(ROLES.PROJECT_UPDATE) && (
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.PROJECT_CONFIG)}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon name="edit" size={20} color={colors.purple} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
      <View style={{paddingHorizontal: 16, marginTop: 20}}>
        <Text style={{...fonts.type.medium(12, colors.grey)}}>
          {projectName}
        </Text>
        <Text style={{...fonts.type.bold(34), marginTop: 8, marginBottom: 10}}>
          {(buildingData || {}).name}
        </Text>
        <View style={styles.row}>
          <View style={{...styles.row, flex: 1}}>
            <View style={styles.tagActive}>
              <Text style={{...fonts.type.medium(12, 'white')}}>Active</Text>
            </View>
            <Text style={{...fonts.type.medium(12)}}>Gateway Connected</Text>
          </View>
          {/* <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setIsList(true)}
              style={{...styles.smallBtn}}>
              <MyIcon
                name="list"
                size={20}
                color={isList ? colors.purple : colors.grey}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsList(false)}
              style={{...styles.smallBtn}}>
              <MyIcon
                name="th"
                solid={!isList}
                size={20}
                color={!isList ? colors.purple : colors.grey}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      <ScrollView
        style={{flex: 1, marginTop: 10}}
        contentContainerStyle={{paddingVertical: 16}}>
        {renderStatus()}
        {isList ? (
          <ProjectList
            projectName={projectName}
            data={(buildingData || {}).children || []}
            selectedItems={selectedItems}
            onNodePress={onNodePress}
            onWallToggle={onWallToggle}
          />
        ) : (
          <ProjectScaffolding
            data={(buildingData || {}).children || []}
            selectedItems={selectedItems}
            currentWall={currentWall}
            setCurrentWall={setCurrentWall}
            currentNode={currentNode}
            onWallToggle={onWallToggle}
          />
        )}
      </ScrollView>
      {renderBottomBar()}
    </SafeAreaView>
  );
}

export default BuildingDetail;

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import routes from '~/navigation/routes';
import AddBuilding from './components/add-building';
import AddWall from './components/add-wall';
import {
  getProjectDetail,
  setIsUpdateDeviceLocation,
  setIsCreateDeviceLocation,
  setIsDeleteDeviceLocation,
} from '~/store/project/actions';
import {getNodeInDeviceLocationTree} from '~/helpers/common';
import {notification} from '~/components/alert/NotificationCenter';
import ROLES from '~/constants/permissions';

function BuildingConfig({navigation, route}) {
  const dispatch = useDispatch();
  const {
    obj,
    isUpdateDeviceLocation,
    isCreateDeviceLocation,
    isDeleteDeviceLocation,
  } = useSelector(state => state.project);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [buildingVisible, setBuildingVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const {arrBuilding, buildingId, projectId} = route.params;
  const {roles} = useSelector(state => state.me);

  useEffect(() => {
    getNodeInDeviceLocationTree(obj.deviceLocationTrees, buildingId, obj =>
      setData(obj),
    );
  }, [obj]);

  useEffect(() => {
    if (isCreateDeviceLocation) {
      notification('SUCCESS', 'Create wall successful');
      dispatch(setIsCreateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isCreateDeviceLocation]);

  useEffect(() => {
    if (isUpdateDeviceLocation) {
      notification('SUCCESS', 'Update building successful');
      dispatch(setIsUpdateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isUpdateDeviceLocation]);

  useEffect(() => {
    if (isDeleteDeviceLocation && isDelete) {
      notification('SUCCESS', 'Delete building successful');
      dispatch(setIsDeleteDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
      setIsDelete(false);
      navigation.goBack();
    }
  }, [isDeleteDeviceLocation]);

  const arrWallName = () => {
    let arr = [];
    ((data || {}).children || []).map(item => {
      arr.push({name: item.name});
    });
    return arr;
  };

  const renderWallItem = (item, index) => {
    const count = data => {
      let countBay = 0;
      let countNode = 0;
      (data || []).map(item => {
        (item.children || []).map(
          item => (countNode = countNode + (item.children || []).length),
        );
        countBay = countBay + (item.children || []).length;
      });
      return {countBay: countBay, countNode: countNode};
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.PROJECT_WALL_CONFIG, {
            arrWall: {children: arrWallName()},
            wallId: item.id,
            projectId: projectId,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 40,
          marginBottom: 16,
        }}
        key={`wall-${index}`}>
        <View style={{flex: 1}}>
          <Text style={{...fonts.type.base(16)}}>{item.name}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text
              style={{
                ...fonts.type.base(12, colors.purple),
                marginRight: 20,
              }}>
              {(item.children || []).length} Levels
            </Text>
            <Text
              style={{
                ...fonts.type.base(12, colors.purple),
                marginRight: 20,
              }}>
              {count(item.children).countBay} Bays
            </Text>
            <Text style={{...fonts.type.base(12, colors.purple)}}>
              {count(item.children).countNode} Nodes
            </Text>
          </View>
        </View>
        <MyIcon name="angle-right" size={20} color={colors.purple} />
      </TouchableOpacity>
    );
  };

  const renderBottomBar = () => {
    return (
      <SafeAreaView edges={['bottom']} style={{...styles.bottomBar}}>
        <View style={{height: 60, marginTop: 25, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.smallBtn}>
            <MyIcon name="arrow-left" size={18} color={colors.purple} />
          </TouchableOpacity>
          <View style={{flex: 1}} />
          {roles.includes(ROLES.PROJECT_CREATE) && (
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.button}>
              <Text style={{...fonts.type.bold(12, colors.purple)}}>
                Add Wall
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        {/* <View style={{flexDirection: 'row'}}>
          <Text
            onPress={() => navigation.navigate(routes.PROJECT_CONFIG_ROOT)}
            style={{...fonts.type.medium(14, colors.purple)}}>
            Project /{' '}
          </Text>
          <Text style={{...fonts.type.medium(14, colors.grey)}}>
            Building / {data.name}
          </Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 30,
          }}>
          <Text style={{...fonts.type.bold(24), flex: 1}}>{data.name}</Text>
          <TouchableOpacity
            onPress={() => setBuildingVisible(true)}
            style={{
              ...styles.smallBtn,
            }}>
            <MyIcon name="edit" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 4}}>
          {(data.children || []).map(renderWallItem)}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 26, paddingVertical: 24}}
        style={{flex: 1}}>
        {renderContent()}
      </ScrollView>
      {renderBottomBar()}
      <AddBuilding
        arrBuilding={arrBuilding}
        data={data}
        projectId={projectId}
        visible={buildingVisible}
        isEdit={true}
        onClose={() => setBuildingVisible(false)}
        setIsDelete={setIsDelete}
      />
      <AddWall
        arrWall={data}
        visible={visible}
        onClose={() => setVisible(false)}
        projectId={projectId}
        parentId={buildingId}
      />
    </View>
  );
}

export default BuildingConfig;

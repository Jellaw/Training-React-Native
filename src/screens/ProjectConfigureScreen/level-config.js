import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import routes from '~/navigation/routes';
import AddLevel from './components/add-level';
import AddBay from './components/add-bay';
import {getNodeInDeviceLocationTree} from '~/helpers/common';
import {
  getProjectDetail,
  setIsCreateDeviceLocation,
  setIsDeleteDeviceLocation,
  setIsUpdateDeviceLocation,
} from '~/store/project/actions';
import {notification} from '~/components/alert/NotificationCenter';
import ROLES from '~/constants/permissions';

function LevelConfig({navigation, route}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [levelVisible, setLevelVisible] = useState(false);
  const [data, setData] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const {
    obj,
    isUpdateDeviceLocation,
    isCreateDeviceLocation,
    isDeleteDeviceLocation,
  } = useSelector(state => state.project);
  const {arrLevel, levelId, projectId} = route.params;
  const {roles} = useSelector(state => state.me);

  useEffect(() => {
    getNodeInDeviceLocationTree(obj.deviceLocationTrees, levelId, obj =>
      setData(obj),
    );
  }, [obj]);

  useEffect(() => {
    if (isCreateDeviceLocation) {
      notification('SUCCESS', 'Create bay successful');
      dispatch(setIsCreateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isCreateDeviceLocation]);

  useEffect(() => {
    if (isUpdateDeviceLocation) {
      notification('SUCCESS', 'Update level successful');
      dispatch(setIsUpdateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isUpdateDeviceLocation]);

  useEffect(() => {
    if (isDeleteDeviceLocation && isDelete) {
      notification('SUCCESS', 'Delete level successful');
      dispatch(setIsDeleteDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
      setIsDelete(false);
      navigation.goBack();
    }
  }, [isDeleteDeviceLocation]);

  const arrBayName = () => {
    let arr = [];
    ((data || {}).children || []).map(item => {
      arr.push({name: item.name});
    });
    return arr;
  };
  const onBuilding = () => {
    navigation.navigate(routes.PROJECT_BUILDING_CONFIG, {
      buildingId: route.params.buildingId,
      projectId: route.params.projectId,
    });
  };

  const renderBayItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.PROJECT_BAY_CONFIG, {
            arrBay: {children: arrBayName()},
            bayId: item.id,
            projectId: projectId,
            buildingId: route.params.buildingId,
            numberOfBays: (data.props || {}).numberOfBays,
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
          <Text style={{...fonts.type.base(16)}}>Bay {item.name}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={{...fonts.type.base(12, colors.purple)}}>
              {(item.children || []).length} Nodes
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
                Add Bay
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
        {
          <View style={{flexDirection: 'row'}}>
            <Text
              onPress={() => navigation.navigate(routes.PROJECT_CONFIG_ROOT)}
              style={{...fonts.type.medium(14, colors.purple)}}>
              Project /{' '}
            </Text>
            <Text
              onPress={onBuilding}
              style={{...fonts.type.medium(14, colors.purple)}}>
              Building /{' '}
            </Text>
            <Text
              onPress={() => navigation.navigate(routes.PROJECT_WALL_CONFIG)}
              style={{...fonts.type.medium(14, colors.purple)}}>
              Wall /{' '}
            </Text>
            <Text style={{...fonts.type.medium(14, colors.grey)}}>Level /</Text>
          </View>
        }
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 30,
          }}>
          <Text style={{...fonts.type.bold(24), flex: 1}}>
            Level {data.name}
          </Text>
          <TouchableOpacity
            onPress={() => setLevelVisible(true)}
            style={{
              ...styles.smallBtn,
            }}>
            <MyIcon name="edit" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 4}}>
          {(data.children || []).map(renderBayItem)}
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
      <AddLevel
        data={data}
        arrLevel={arrLevel}
        projectId={projectId}
        visible={levelVisible}
        isEdit={true}
        onClose={() => setLevelVisible(false)}
        setIsDelete={setIsDelete}
      />
      <AddBay
        arrBay={data}
        numberOfBays={(data.props || {}).numberOfBays}
        visible={visible}
        onClose={() => setVisible(false)}
        projectId={projectId}
        parentId={levelId}
      />
    </View>
  );
}

export default LevelConfig;

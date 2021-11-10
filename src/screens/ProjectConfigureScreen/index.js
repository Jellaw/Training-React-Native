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
import CreateProject from './components/create-project';
import {getCompanyList} from '~/store/company/actions';
import {
  getProjectDetail,
  setIsUpdate,
  setIsCreateDeviceLocation,
} from '~/store/project/actions';
import {notification} from '~/components/alert/NotificationCenter';
import ROLES from '~/constants/permissions';

function ProjectConfigScreen({navigation}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [projectVisible, setProjectVisible] = useState(false);
  const {roles} = useSelector(state => state.me);
  const {obj, isUpdate, isCreateDeviceLocation} = useSelector(
    state => state.project,
  );

  useEffect(() => {
    if (isUpdate) {
      notification('SUCCESS', 'Update project successful');
      dispatch(setIsUpdate(false));
      dispatch(getProjectDetail(obj.id));
    }
  }, [isUpdate]);

  useEffect(() => {
    if (isCreateDeviceLocation) {
      notification('SUCCESS', 'Create building successful');
      dispatch(setIsCreateDeviceLocation(false));
      dispatch(getProjectDetail(obj.id));
    }
  }, [isCreateDeviceLocation]);

  const arrBuildingName = () => {
    let arr = [];
    ((obj || {}).deviceLocationTrees || []).map(item => {
      arr.push({name: item.name});
    });
    return arr;
  };
  const onBuilding = item => {
    navigation.navigate(routes.PROJECT_BUILDING_CONFIG, {
      arrBuilding: arrBuildingName(),
      buildingId: item.id,
      projectId: obj.id,
    });
  };

  const handleEditProject = () => {
    dispatch(getCompanyList({meta: {pageSize: 10000}}));
    setProjectVisible(true);
  };

  const renderWallItem = (item, index, dataWall) => {
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
    const arrWallName = () => {
      let arr = [];
      ((dataWall || {}).children || []).map(item => {
        arr.push({name: item.name});
      });
      return arr;
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.PROJECT_WALL_CONFIG, {
            buildingId: dataWall.id,
            arrWall: {children: arrWallName()},
            wallId: item.id,
            projectId: obj.id,
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

  const renderBuildingItem = (item, index) => {
    return (
      <View key={index.toString()} style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => onBuilding(item)}
          style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
          <Text style={{...fonts.type.bold(16), flex: 1}}>{item.name}</Text>
          <MyIcon name="angle-right" size={20} color={colors.purple} />
        </TouchableOpacity>
        <View style={{paddingLeft: 10, marginTop: 10}}>
          {(item.children || []).map((wallItem, index) =>
            renderWallItem(wallItem, index, item),
          )}
        </View>
      </View>
    );
  };

  const renderBottomBar = () => {
    return (
      <SafeAreaView edges={['bottom']} style={{...styles.bottomBar}}>
        <View style={{height: 60, marginTop: 25, flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          {roles.includes(ROLES.PROJECT_CREATE) && (
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.button}>
              <Text style={{...fonts.type.bold(12, colors.purple)}}>
                Add Building
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
        {<Text style={{...fonts.type.medium(14, colors.grey)}}>Project /</Text>}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 30,
          }}>
          <Text style={{...fonts.type.bold(24), flex: 1}}>{obj.name}</Text>
          <TouchableOpacity
            onPress={handleEditProject}
            style={{
              ...styles.smallBtn,
            }}>
            <MyIcon name="edit" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          {(obj.deviceLocationTrees || []).map(renderBuildingItem)}
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
        arrBuilding={obj.deviceLocationTrees}
        projectId={obj.id}
        visible={visible}
        onClose={() => setVisible(false)}
      />
      <CreateProject
        data={obj}
        visible={projectVisible}
        isEdit={true}
        onClose={() => setProjectVisible(false)}
      />
    </View>
  );
}

export default ProjectConfigScreen;

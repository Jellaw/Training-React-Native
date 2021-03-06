import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import routes from '~/navigation/routes';
import AddWall from './components/add-wall';
import AddLevel from './components/add-level';
import {getNodeInDeviceLocationTree} from '~/helpers/common';
import {
  getProjectDetail,
  setIsCreateDeviceLocation,
  setIsDeleteDeviceLocation,
  setIsUpdateDeviceLocation,
} from '~/store/project/actions';
import {notification} from '~/components/alert/NotificationCenter';

function WallConfig({navigation, route}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const {
    obj,
    isUpdateDeviceLocation,
    isCreateDeviceLocation,
    isDeleteDeviceLocation,
  } = useSelector(state => state.project);
  const [wallVisible, setWallVisible] = useState(false);
  const {wallId, projectId} = route.params;

  useEffect(() => {
    getNodeInDeviceLocationTree(obj.deviceLocationTrees, wallId, obj =>
      setData(obj),
    );
  }, [obj]);

  useEffect(() => {
    if (isCreateDeviceLocation) {
      notification('SUCCESS', 'Create level successful');
      dispatch(setIsCreateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isCreateDeviceLocation]);

  useEffect(() => {
    if (isUpdateDeviceLocation) {
      notification('SUCCESS', 'Update wall successful');
      dispatch(setIsUpdateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isUpdateDeviceLocation]);

  useEffect(() => {
    if (isDeleteDeviceLocation && isDelete) {
      notification('SUCCESS', 'Delete wall successful');
      dispatch(setIsDeleteDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
      setIsDelete(false);
      navigation.goBack();
    }
  }, [isDeleteDeviceLocation]);

  const renderLevelItem = (item, index) => {
    const count = data => {
      let countNode = 0;
      (data || []).map(
        item => (countNode = countNode + (item.children || []).length),
      );
      return countNode;
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.PROJECT_LEVEL_CONFIG, {
            levelId: item.id,
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
          <Text style={{...fonts.type.base(16)}}>Level {item.name}</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text
              style={{
                ...fonts.type.base(12, colors.purple),
                marginRight: 20,
              }}>
              {(item.children || []).length} Bays
            </Text>
            <Text style={{...fonts.type.base(12, colors.purple)}}>
              {count(item.children)} Nodes
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
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.button}>
            <Text style={{...fonts.type.bold(12, colors.purple)}}>
              Add Level
            </Text>
          </TouchableOpacity>
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
          <Text
            onPress={() => navigation.navigate(routes.PROJECT_BUILDING_CONFIG)}
            style={{...fonts.type.medium(14, colors.purple)}}>
            Building /{' '}
          </Text>
          <Text style={{...fonts.type.medium(14, colors.grey)}}>Wall / {data.name}</Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 30,
          }}>
          <Text style={{...fonts.type.bold(24), flex: 1}}>{data.name}</Text>
          <TouchableOpacity
            onPress={() => setWallVisible(true)}
            style={{
              ...styles.smallBtn,
            }}>
            <MyIcon name="edit" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 4}}>
          {(data.children || []).map(renderLevelItem)}
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
      <AddWall
        data={data}
        projectId={projectId}
        visible={wallVisible}
        isEdit={true}
        onClose={() => setWallVisible(false)}
        setIsDelete={setIsDelete}
      />
      <AddLevel
        visible={visible}
        onClose={() => setVisible(false)}
        projectId={projectId}
        parentId={wallId}
      />
    </View>
  );
}

export default WallConfig;

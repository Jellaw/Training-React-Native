import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import routes from '~/navigation/routes';
import {getNodeInDeviceLocationTree} from '~/helpers/common';
import {
  createProjectDeviceLocation,
  deleteProjectDeviceLocation,
  getProjectDetail,
  setIsCreateDeviceLocation,
  setIsDeleteDeviceLocation,
  setIsUpdateDeviceLocation,
} from '~/store/project/actions';
import AddBay from './components/add-bay';
import AddSide from './components/add-side';
import {getTtnAplicationList} from '~/store/ttn-application/actions';
import {DEVICE_LOCATION_TREE_SIDE_NAME} from '~/constants/masterData';
import {isEmpty} from 'validate.js';
import {notification} from '~/components/alert/NotificationCenter';
import {Popup} from '~/components/popup';
import ROLES from '~/constants/permissions';

function BayConfig({navigation, route}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [side, setSide] = useState({});
  const [nameSide, setNameSide] = useState({});
  const [visible, setVisible] = useState(false);
  const [visibleSide, setVisibleSide] = useState(false);
  const [visibleAccuracy, setVisibleAccuracy] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const {roles} = useSelector(state => state.me);

  const shortSide = () => {
    let side = {};
    (data.children || []).map(item => {
      side = {...side, [DEVICE_LOCATION_TREE_SIDE_NAME[item.name]]: item};
    });
    return side;
  };
  const {
    obj,
    isCreateDeviceLocation,
    isUpdateDeviceLocation,
    isDeleteDeviceLocation,
  } = useSelector(state => state.project);
  const {arrBay, bayId, projectId, numberOfBays} = route.params;

  useEffect(() => {
    roles.includes(ROLES.TTN_APPLICATION_GET_LIST) &&
      dispatch(getTtnAplicationList({meta: {pageSize: 10000}}));
  }, []);

  useEffect(() => {
    getNodeInDeviceLocationTree(obj.deviceLocationTrees, bayId, obj =>
      setData(obj),
    );
  }, [obj]);

  useEffect(() => {
    setSide(shortSide());
  }, [data]);

  useEffect(() => {
    if (isCreateDeviceLocation) {
      notification('', '');
      dispatch(setIsCreateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isCreateDeviceLocation]);

  useEffect(() => {
    if (isUpdateDeviceLocation) {
      notification('SUCCESS', 'Update bay successful');
      dispatch(setIsUpdateDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isUpdateDeviceLocation]);

  useEffect(() => {
    if (isDeleteDeviceLocation && isDelete) {
      notification('SUCCESS', 'Delete bay successful');
      dispatch(setIsDeleteDeviceLocation(false));
      dispatch(getProjectDetail(projectId));
      setIsDelete(false);
      navigation.goBack();
    }
  }, [isDeleteDeviceLocation]);

  const accuracyAccess = async () => {
    const deleteSide = await dispatch(
      deleteProjectDeviceLocation(projectId, side[nameSide].id),
    );
    if (deleteSide) {
      dispatch(setIsDeleteDeviceLocation(false));
      notification('SUCCESS', 'Delete side successful');
      dispatch(getProjectDetail(projectId));
      setVisibleAccuracy(false);
    }
  };

  const openAddSide = name => {
    if (!isEmpty(side[name])) {
      setNameSide(name);
      setVisibleAccuracy(true);
      return;
    }
    setNameSide(name);
    setVisibleSide(true);
  };

  const onBuilding = () => {
    navigation.navigate(routes.PROJECT_BUILDING_CONFIG, {
      buildingId: route.params.buildingId,
      projectId: route.params.projectId,
    });
  };

  const openScan = async (side, name) => {
    if (isEmpty(side)) {
      const dataCreate = await dispatch(
        createProjectDeviceLocation(projectId, {
          parentId: bayId,
          name: name,
        }),
      );
      return navigation.navigate(routes.ADD_DEVICE, {
        projectId: projectId,
        deviceLocationTreeId: (dataCreate.data || {}).id,
      });
    }

    navigation.navigate(routes.ADD_DEVICE, {
      projectId: projectId,
      deviceLocationTreeId: side.id,
    });
  };
  const renderBayConfig = () => {
    return (
      <View style={{marginTop: 25}}>
        <View>
          <Text style={styles.inputLabel}>Left</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => openAddSide(DEVICE_LOCATION_TREE_SIDE_NAME.LEFT)}>
              <Text
                style={{
                  padding: 13,
                  ...styles.textInput,
                }}>
                {!isEmpty(
                  (side[DEVICE_LOCATION_TREE_SIDE_NAME.LEFT] || {})
                    .projectNodes,
                )
                  ? side[DEVICE_LOCATION_TREE_SIDE_NAME.LEFT].projectNodes[0]
                      .devEui
                  : ''}
              </Text>
            </TouchableOpacity>
            {roles.includes(ROLES.PROJECT_CREATE) && (
              <TouchableOpacity
                onPress={() =>
                  openScan(
                    side[DEVICE_LOCATION_TREE_SIDE_NAME.LEFT],
                    DEVICE_LOCATION_TREE_SIDE_NAME.LEFT,
                  )
                }
                style={{...styles.smallBtn}}>
                <MyIcon name="qrcode" size={18} color={colors.purple} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.inputLabel}>Right</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => openAddSide(DEVICE_LOCATION_TREE_SIDE_NAME.RIGHT)}>
              <Text
                style={{
                  padding: 13,
                  ...styles.textInput,
                }}>
                {!isEmpty(
                  (side[DEVICE_LOCATION_TREE_SIDE_NAME.RIGHT] || {})
                    .projectNodes,
                )
                  ? side[DEVICE_LOCATION_TREE_SIDE_NAME.RIGHT].projectNodes[0]
                      .devEui
                  : ''}
              </Text>
            </TouchableOpacity>
            {roles.includes(ROLES.PROJECT_CREATE) && (
              <TouchableOpacity
                onPress={() =>
                  openScan(
                    side[DEVICE_LOCATION_TREE_SIDE_NAME.RIGHT],
                    DEVICE_LOCATION_TREE_SIDE_NAME.RIGHT,
                  )
                }
                style={{...styles.smallBtn}}>
                <MyIcon name="qrcode" size={18} color={colors.purple} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.inputLabel}>Back</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => openAddSide(DEVICE_LOCATION_TREE_SIDE_NAME.BACK)}>
              <Text
                style={{
                  padding: 13,
                  ...styles.textInput,
                }}>
                {!isEmpty(
                  (side[DEVICE_LOCATION_TREE_SIDE_NAME.BACK] || {})
                    .projectNodes,
                )
                  ? side[DEVICE_LOCATION_TREE_SIDE_NAME.BACK].projectNodes[0]
                      .devEui
                  : ''}
              </Text>
            </TouchableOpacity>
            {roles.includes(ROLES.PROJECT_CREATE) && (
              <TouchableOpacity
                onPress={() =>
                  openScan(
                    side[DEVICE_LOCATION_TREE_SIDE_NAME.BACK],
                    DEVICE_LOCATION_TREE_SIDE_NAME.BACK,
                  )
                }
                style={{...styles.smallBtn}}>
                <MyIcon name="qrcode" size={18} color={colors.purple} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{marginBottom: 24}}>
          <Text style={styles.inputLabel}>Wall</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => openAddSide(DEVICE_LOCATION_TREE_SIDE_NAME.WALL)}>
              <Text
                style={{
                  padding: 13,
                  ...styles.textInput,
                }}>
                {!isEmpty(
                  (side[DEVICE_LOCATION_TREE_SIDE_NAME.WALL] || {})
                    .projectNodes,
                )
                  ? side[DEVICE_LOCATION_TREE_SIDE_NAME.WALL].projectNodes[0]
                      .devEui
                  : ''}
              </Text>
            </TouchableOpacity>
            {roles.includes(ROLES.PROJECT_CREATE) && (
              <TouchableOpacity
                onPress={() =>
                  openScan(
                    side[DEVICE_LOCATION_TREE_SIDE_NAME.WALL],
                    DEVICE_LOCATION_TREE_SIDE_NAME.WALL,
                  )
                }
                style={{...styles.smallBtn}}>
                <MyIcon name="qrcode" size={18} color={colors.purple} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderBottomBar = () => {
    return (
      <SafeAreaView edges={['bottom']} style={{...styles.bottomBar}}>
        <View
          style={{
            height: 80,
            marginTop: 25,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.smallBtn}>
            <MyIcon name="arrow-left" size={18} color={colors.purple} />
          </TouchableOpacity>
          <View style={{flex: 1}} />
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
            <Text
              onPress={() => navigation.navigate(routes.PROJECT_LEVEL_CONFIG)}
              style={{...fonts.type.medium(14, colors.purple)}}>
              Level /{' '}
            </Text>
            <Text style={{...fonts.type.medium(14, colors.grey)}}>Bay /</Text>
          </View>
        }
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 30,
          }}>
          <Text style={{...fonts.type.bold(24), flex: 1}}>Bay {data.name}</Text>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              ...styles.smallBtn,
            }}>
            <MyIcon name="edit" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>
        {renderBayConfig()}
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
      <AddBay
        data={data}
        arrBay={arrBay}
        visible={visible}
        onClose={() => setVisible(false)}
        numberOfBays={numberOfBays}
        projectId={projectId}
        isEdit={true}
        setIsDelete={setIsDelete}
      />
      <AddSide
        navigation={navigation}
        nameSide={nameSide}
        visible={visibleSide}
        onClose={() => setVisibleSide(false)}
        projectId={projectId}
        parentId={bayId}
      />
      <Popup isVisible={visibleAccuracy} height={200}>
        <Text style={{...fonts.type.bold(18), textAlign: 'center'}}>
          You have to remove current node first? ({nameSide})
        </Text>

        <View
          style={{
            height: 60,
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setVisibleAccuracy(false)}
            style={styles.button}>
            <Text style={{...fonts.type.bold(12, colors.purple)}}>No</Text>
          </TouchableOpacity>
          <View style={{width: 50}} />
          <TouchableOpacity
            onPress={accuracyAccess}
            style={[styles.button, {backgroundColor: colors.purple}]}>
            <Text style={{...fonts.type.bold(12, colors.white)}}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Popup>
    </View>
  );
}

export default BayConfig;

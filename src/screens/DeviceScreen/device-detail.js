import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import routes from '~/navigation/routes';
import images from '~/assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {getDeviceColor, getDeviceStateIcon} from './utils';
import DeviceCheck from './components/device-check';
import LoadingPopup from './components/loading-popup';
import {NODE_STATUS} from '~/constants/masterData';
import {
  getProjectDetail,
  ProjectBulkAction,
  setIsProjectBulkAction,
} from '~/store/project/actions';
import {getCheckNode} from '~/store/node/actions';
import ROLES from '~/constants/permissions';

function DeviceDetail({navigation}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowEndMessage, setIsShowEndMessage] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertIcon, setAlertIcon] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const {isProjectBulkAction} = useSelector(state => state.project);
  const route = useRoute();
  const {status, data, devEui} = route.params;
  const {roles} = useSelector(state => state.me);

  useEffect(async () => {
    if (isProjectBulkAction) {
      const check = await getCheckNode({devEui: data.devEui});
      await delay(1000);
      setLoading(false);
      setAlertColor(colors.green);
      setIsShowEndMessage(true);
      setAlertIcon('check-circle');
      setAlertTitle('Change Status Device Successful');
      setAlertMessage('');
      dispatch(setIsProjectBulkAction(false));
      dispatch(getProjectDetail(data.projectId));
      navigation.setParams({
        status: check.status,
        data: check,
      });
    }
  }, [isProjectBulkAction]);

  const onDeviceCheck = async isdevEui => {
    setLoading(true);
    if (data.devEui === isdevEui) {
      await delay(1000);
      setAlertColor(colors.green);
      setIsShowEndMessage(true);
      setAlertIcon('check-circle');
      setAlertTitle('Correct Device');
      setAlertMessage('You have scanned the correct device');
      return setLoading(false);
    }
    await delay(1000);
    setAlertColor(colors.red);
    setIsShowEndMessage(true);
    setAlertIcon('times-circle');
    setAlertTitle('Not Correct Device');
    setAlertMessage('You have scanned the not correct device');
    setLoading(false);
  };

  const onDeviceBulkAction = async type => {
    setLoading(true);
    dispatch(ProjectBulkAction(data.projectId, type, {nodes: [data.id]}));
    await delay(2000);
  };

  const onReplaceDevice = () => {
    navigation.navigate(routes.ADD_DEVICE, {
      deviceLocationTreeId: (data.deviceLocationTree || {}).id,
      projectId: data.projectId,
    });
  };

  const delay = interval => {
    return new Promise(res => setTimeout(res, interval));
  };

  const handleGoToScafollfing = async () => {
    await dispatch(getProjectDetail(data.projectId));
    navigation.navigate(routes.PROJECT, {
      screen: routes.BUILDING_DETAIL,
      params: {
        projectName: data.project.name,
        buildingId: data.deviceLocationTree.parent.parent.parent.parent.id,
        wallId: data.deviceLocationTree.parent.parent.parent.id,
        levelName: data.deviceLocationTree.parent.parent.name,
        bayName: data.deviceLocationTree.parent.name,
      },
    });
  };

  const renderTopCard = () => {
    return (
      <SafeAreaView
        style={{
          backgroundColor: getDeviceColor(Number(status)),
          paddingHorizontal: 21,
          borderBottomLeftRadius: 26,
          borderBottomRightRadius: 26,
          height: 430,
        }}>
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <MyIcon
            name={getDeviceStateIcon(Number(status))}
            size={20}
            color="white"
          />
          {/* <MyIcon name='pause-circle' size={20} color="white" /> */}
          <Text style={{...fonts.type.bold(24, 'white'), marginTop: 5}}>
            {(status == NODE_STATUS.PAUSE && 'PAUSE') ||
              (status == NODE_STATUS.ACTIVE && 'ACTIVE') ||
              (status == NODE_STATUS.ALERT && 'ALERT') ||
              (status == NODE_STATUS.PAUSE && 'PAUSE') ||
              (status == NODE_STATUS.CHECK && 'CHECK')}
          </Text>
          <Text style={{...fonts.type.heavy(16, 'white'), marginTop: 20}}>
            Device in{' '}
            {(status == NODE_STATUS.PAUSE && 'Pause') ||
              (status == NODE_STATUS.ACTIVE && 'Active') ||
              (status == NODE_STATUS.ALERT && 'Alert') ||
              (status == NODE_STATUS.PAUSE && 'Pause') ||
              (status == NODE_STATUS.CHECK && 'Check')}{' '}
            state
          </Text>
          <Text
            style={{
              ...fonts.type.base(16, 'white'),
              textAlign: 'center',
              marginTop: 12,
            }}>
            {(status == NODE_STATUS.PAUSE &&
              'To resume tracking, check the device before you switch it back to active.') ||
              (status == NODE_STATUS.ACTIVE &&
                'In order to resume tracking check the device before you switch it back to active.') ||
              (status == NODE_STATUS.ALERT &&
                'Please ensure that the scaffolding connections are secured and wait for the device to change to ‘Check state’.') ||
              (status == NODE_STATUS.PAUSE &&
                'To resume tracking, check the device before you switch it back to active.') ||
              (status == NODE_STATUS.CHECK &&
                'This means the device is active but needs to be manually switched back to ACTIVE.')}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 50}}>
          {data.deviceLocationTree && (
            <View style={{flex: 1}}>
              <Text style={{...fonts.type.semibold(15, 'white')}}>
                {data.deviceLocationTree.parent.parent.parent.name} / Level{' '}
                {data.deviceLocationTree.parent.parent.name}
              </Text>
              <Text style={{...fonts.type.semibold(24, 'white'), marginTop: 9}}>
                Bay {data.deviceLocationTree.parent.name} [
                {data.deviceLocationTree.name}]
              </Text>
              <Text style={{...fonts.type.base(14, 'white'), marginTop: 11}}>
                {data.project.name}
              </Text>
              <Text style={{...fonts.type.base(14, 'white'), marginTop: 5}}>
                {data.deviceLocationTree.parent.parent.parent.parent.name}
              </Text>
            </View>
          )}
          <Image source={images.device} />
        </View>
      </SafeAreaView>
    );
  };

  const renderInfo = () => {
    return (
      <View style={{marginTop: 41, paddingHorizontal: 26}}>
        <Text style={{...fonts.type.base(12, colors.grey)}}>Device ID</Text>
        <Text style={{...fonts.type.medium(14), marginTop: 6}}>
          {data.deviceId}
        </Text>
        <Text style={{...fonts.type.base(12, colors.grey), marginTop: 14}}>
          Dev EUI
        </Text>
        <Text style={{...fonts.type.medium(14), marginTop: 6}}>
          {data.devEui}
        </Text>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          paddingHorizontal: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 50,
        }}>
        {roles.includes(ROLES.PROJECT_NODE_CHECKED) && (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: colors.purple,
              }}>
              <MyIcon name="qrcode" size={24} color={colors.purple} />
            </TouchableOpacity>
            <Text style={{...fonts.type.base(12, colors.purple), marginTop: 7}}>
              Device Check
            </Text>
          </View>
        )}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={handleGoToScafollfing}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: colors.purple,
            }}>
            <MyIcon name="map-pin" size={24} color={colors.purple} />
          </TouchableOpacity>
          <Text style={{...fonts.type.base(12, colors.purple), marginTop: 7}}>
            Locate
          </Text>
        </View>
        {status == NODE_STATUS.ALERT &&
          roles.includes(ROLES.PROJECT_NODE_BULK) && (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={onReplaceDevice}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderColor: colors.purple,
                }}>
                <MyIcon name="qrcode" size={24} color={colors.purple} />
              </TouchableOpacity>
              <Text
                style={{...fonts.type.base(12, colors.purple), marginTop: 7}}>
                Replace Device
              </Text>
            </View>
          )}
        {status == NODE_STATUS.CHECK &&
          roles.includes(ROLES.PROJECT_NODE_RESUME) && (
            <View style={{alignItems: 'center', width: 60}}>
              <TouchableOpacity
                onPress={() => onDeviceBulkAction('checked')}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderColor: colors.purple,
                }}>
                <MyIcon name="check" size={24} color={colors.purple} />
              </TouchableOpacity>
              <Text
                style={{
                  ...fonts.type.base(12, colors.purple),
                  textAlign: 'center',
                  marginTop: 7,
                }}>
                Checked Resume
              </Text>
            </View>
          )}
        {status == NODE_STATUS.ACTIVE &&
          roles.includes(ROLES.PROJECT_NODE_PAUSE) && (
            <View style={{alignItems: 'center', width: 60}}>
              <TouchableOpacity
                onPress={() => onDeviceBulkAction('pause')}
                style={{
                  width: 50,
                  height: 50,
                }}>
                <MyIcon
                  name="pause-circle"
                  size={50}
                  light
                  color={colors.purple}
                />
              </TouchableOpacity>
              <Text
                style={{
                  ...fonts.type.base(12, colors.purple),
                  textAlign: 'center',
                  marginTop: 7,
                }}>
                Pause Tracking
              </Text>
            </View>
          )}
        {status == NODE_STATUS.PAUSE &&
          roles.includes(ROLES.PROJECT_NODE_CHECKED) && (
            <View style={{alignItems: 'center', width: 60}}>
              <TouchableOpacity
                onPress={() => onDeviceBulkAction('resume')}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderColor: colors.purple,
                }}>
                <MyIcon
                  name="play"
                  style={{marginLeft: 5}}
                  size={24}
                  color={colors.purple}
                />
              </TouchableOpacity>
              <Text
                style={{
                  ...fonts.type.base(12, colors.purple),
                  textAlign: 'center',
                  marginTop: 7,
                }}>
                Resume Tracking
              </Text>
            </View>
          )}
      </View>
    );
  };

  const renderDevice = () => {
    return (
      <View style={{paddingHorizontal: 16, flex: 1}}>
        {renderTopCard()}
        {renderInfo()}
        {renderButtons()}
      </View>
    );
  };

  const renderUnrecognized = () => {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{marginTop: 20, alignItems: 'center', paddingHorizontal: 36}}>
          <MyIcon
            name={getDeviceStateIcon(status)}
            size={20}
            color={colors.purple}
          />
          <Text style={{...fonts.type.bold(24, colors.purple)}}>{status}</Text>
          <Text
            style={{...fonts.type.heavy(66, colors.mediumgrey), marginTop: 92}}>
            404
          </Text>
          <Text style={{...fonts.type.heavy(16), marginTop: 60}}>
            Unkown Device
          </Text>
          <Text
            style={{
              ...fonts.type.base(16),
              marginTop: 11,
              textAlign: 'center',
            }}>
            If you are trying to connect this device to this project, please
            scan again in the project config / bay section.
          </Text>
          {devEui && (
            <>
              <Text
                style={{...fonts.type.base(12, colors.grey), marginTop: 66}}>
                You scanned
              </Text>
              <Text style={{...fonts.type.base(14), marginTop: 6}}>
                {devEui}
              </Text>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1, paddingTop: 0}}>
      <ScrollView>
        {status === 'UNRECOG' ? renderUnrecognized() : renderDevice()}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 50,
            height: 45,
            alignItems: 'center',
            paddingTop: 16,
          }}>
          <Text style={{...fonts.type.bold(16, colors.purple)}}>Close</Text>
        </TouchableOpacity>
        <DeviceCheck
          visible={visible}
          devEui={devEui}
          onClose={() => setVisible(false)}
          onScan={devEui => onDeviceCheck(devEui)}
        />
        <LoadingPopup
          visible={loading}
          showEndMessage={isShowEndMessage}
          alertColor={alertColor}
          setAlertColor={setAlertColor}
          endIcon={alertIcon}
          endTitle={alertTitle}
          endMessage={alertMessage}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default DeviceDetail;

import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import images from '~/assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getCheckNode} from '~/store/node/actions';
import {
  createProjectForceLink,
  getProjectDetail,
  setIsCreateProjectForceLink,
} from '~/store/project/actions';
import ROLES from '~/constants/permissions';

function AddDevEui({navigation, route}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false);
  const [dataDevEui, setDataDevEui] = useState(false);
  const {isCreateProjectForceLink} = useSelector(state => state.project);
  const {roles} = useSelector(state => state.me);

  const anim = useRef(new Animated.Value(0)).current;
  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const {projectId, deviceLocationTreeId, devEui} = route.params;

  const animation = React.useRef(null);

  useEffect(() => {
    if (isCreateProjectForceLink) {
      setLoading(false);
      setIsDone(true);
      dispatch(setIsCreateProjectForceLink(false));
      dispatch(getProjectDetail(projectId));
    }
  }, [isCreateProjectForceLink]);

  useEffect(async () => {
    const check = await getCheckNode({devEui: devEui});
    if (check.projectId) {
      setDataDevEui(check);
      setIsDeviceRegistered(true);
      await delay(2000);
      return setLoading(false);
    }
    setIsDeviceRegistered(false);
    await delay(2000);
    return setLoading(false);
  }, [devEui]);

  useEffect(() => {
    if (!animation.current) {
      animation.current = Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      );
    }
    if (animation.current) {
      if (loading) {
        animation.current.start();
      } else {
        animation.current.stop();
        animation.current = null;
      }
    }
  }, [loading]);

  const onLinkDevice = async () => {
    setLoading(true);
    await delay(1000);
    dispatch(
      createProjectForceLink(projectId, {
        devEui: devEui,
        deviceLocationTreeId: deviceLocationTreeId,
      }),
    );
    await delay(1000);
  };

  const delay = interval => {
    return new Promise(res => setTimeout(res, interval));
  };

  const renderScanned = () => {
    return isDeviceRegistered ? renderRegisteredDevice() : renderDevice();
  };

  const renderDevice = () => {
    return (
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 36,
            flex: 1,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image source={images.logo} />
            <Text
              style={{
                ...fonts.type.heavy(16),
                textAlign: 'center',
                marginTop: 23,
              }}>
              This device Dev EUI has not been detected in this system
            </Text>
            <Text
              style={{
                ...fonts.type.base(16),
                textAlign: 'center',
                marginTop: 20,
              }}>
              If you would like to create this device click Register below. This
              will create the device with a new Device ID in the system.
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 40,
              aspectRatio: 1,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            {loading ? (
              <View
                style={{
                  backgroundColor: colors.mediumgrey,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animated.View style={{transform: [{rotate: rotate}]}}>
                  <MyIcon name="sync-alt" size={70} color="black" light />
                </Animated.View>
                <Text style={{...fonts.type.medium(16), marginTop: 20}}>
                  Please wait…
                </Text>
              </View>
            ) : (
              <Image
                source={images.sampleDevice}
                style={{width: '100%', height: '100%'}}
              />
            )}
          </View>
          {roles.includes(ROLES.PROJECT_NODE_UPDATE) && (
            <>
              <TouchableOpacity
                onPress={onLinkDevice}
                style={{
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: colors.purple,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                }}>
                <Text style={{...fonts.type.bold(16, 'white')}}>
                  Register Device & Link to Project
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 45,
                  alignItems: 'center',
                  paddingTop: 16,
                }}>
                <Text style={{...fonts.type.bold(16, colors.purple)}}>
                  Close
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    );
  };

  const renderRegisteredDevice = () => {
    return (
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.red,
            flex: 1,
            borderRadius: 30,
            marginHorizontal: 16,
            paddingHorizontal: 16,
            paddingVertical: 25,
          }}>
          <MyIcon name="exclamation-circle" size={70} light color="white" />
          <Text
            style={{
              ...fonts.type.heavy(16, 'white'),
              textAlign: 'center',
              marginTop: 24,
            }}>
            This device is currently linked to another project
          </Text>
          <Text
            style={{
              ...fonts.type.base(16, 'white'),
              textAlign: 'center',
              marginTop: 20,
            }}>
            If you are trying to connect this device to this project, please
            note that this will remove this device from the other project and
            register it as a new device.
          </Text>
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                aspectRatio: 1,
                borderRadius: 10,
                overflow: 'hidden',
                marginTop: 20,
              }}>
              {loading ? (
                <View
                  style={{
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Animated.View style={{transform: [{rotate: rotate}]}}>
                    <MyIcon name="sync-alt" size={70} color="white" light />
                  </Animated.View>
                  <Text
                    style={{...fonts.type.medium(16, 'white'), marginTop: 20}}>
                    Please wait…
                  </Text>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      backgroundColor: '#0000001A',
                      aspectRatio: 1,
                      padding: 30,
                    }}>
                    {dataDevEui.deviceLocationTree && dataDevEui.project && (
                      <>
                        <Text style={{...fonts.type.medium(23, 'white')}}>
                          {dataDevEui.project.company.name}
                        </Text>
                        <Text
                          style={{
                            ...fonts.type.base(14, 'white'),
                            marginTop: 20,
                          }}>
                          {dataDevEui.project.name} /{' '}
                          {
                            dataDevEui.deviceLocationTree.parent.parent.parent
                              .parent.name
                          }
                        </Text>
                        <Text
                          style={{
                            ...fonts.type.medium(14, 'white'),
                            marginTop: 10,
                          }}>
                          {
                            dataDevEui.deviceLocationTree.parent.parent.parent
                              .name
                          }{' '}
                          / Level{' '}
                          {dataDevEui.deviceLocationTree.parent.parent.name} /
                          Bay {dataDevEui.deviceLocationTree.parent.name} [
                          {dataDevEui.deviceLocationTree.name}]
                        </Text>
                        <Text
                          style={{
                            ...fonts.type.base(12, 'white'),
                            marginTop: 20,
                          }}>
                          Device ID
                        </Text>
                        <Text
                          style={{
                            ...fonts.type.medium(14, 'white'),
                            marginTop: 10,
                          }}>
                          {dataDevEui.deviceId}
                        </Text>
                        <Text
                          style={{
                            ...fonts.type.base(12, 'white'),
                            marginTop: 20,
                          }}>
                          Dev EUI
                        </Text>
                        <Text
                          style={{
                            ...fonts.type.medium(14, 'white'),
                            marginTop: 10,
                          }}>
                          {dataDevEui.devEui}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              )}
            </View>
            {!loading && roles.includes(ROLES.PROJECT_NODE_CREATE) && (
              <TouchableOpacity
                onPress={onLinkDevice}
                style={{
                  height: 44,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{...fonts.type.bold(16, 'white')}}>
                  Link to This Project
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {!loading && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 45,
                alignItems: 'center',
                paddingTop: 16,
              }}>
              <Text style={{...fonts.type.bold(16, 'white')}}>Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  };

  const renderDone = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.green,
          flex: 1,
          borderRadius: 30,
          marginHorizontal: 16,
          paddingTop: '50%',
          paddingHorizontal: 44,
          paddingBottom: 32,
        }}>
        <MyIcon name="check-circle" size={70} light color="white" />
        <Text style={{...fonts.type.bold(16, 'white'), marginTop: 24}}>
          Well done
        </Text>
        <Text
          style={{
            ...fonts.type.medium(16, 'white'),
            textAlign: 'center',
            marginTop: 20,
            flex: 1,
          }}>
          You have successfully registered a new device
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 45,
            alignItems: 'center',
            paddingTop: 16,
          }}>
          <Text style={{...fonts.type.bold(16, 'white')}}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View
          style={{
            height: '100%',
            backgroundColor: colors.mediumgrey,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.View style={{transform: [{rotate: rotate}]}}>
            <MyIcon name="sync-alt" size={70} color="black" light />
          </Animated.View>
          <Text style={{...fonts.type.medium(16), marginTop: 20}}>
            Please wait…
          </Text>
        </View>
      ) : isDone ? (
        renderDone()
      ) : (
        renderScanned()
      )}
    </SafeAreaView>
  );
}

export default AddDevEui;

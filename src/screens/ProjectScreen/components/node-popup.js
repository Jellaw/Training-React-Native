import React from 'react';
import {Animated, Easing, Text, TouchableOpacity, View} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import fonts from '~/assets/fonts';
import MyIcon from '~/components/MyIcon';
import {NODE_STATUS} from '~/constants/masterData';
import {getDeviceColor} from '~/screens/DeviceScreen/utils';

const getDeviceStateIcon = status => {
  if (status === null) {
    return 'pause-circle';
  }
  switch (Number(status)) {
    case NODE_STATUS.ALERT:
      return 'bell';
    case NODE_STATUS.ACTIVE:
      return 'router';
    case NODE_STATUS.CHECK:
      return 'router';
    case NODE_STATUS.PAUSE:
      return 'pause-circle';
    default:
      return 'question-circle';
  }
};

const NodePopup = props => {
  const {visible, data, location, onClose, onChoose} = props;
  const projectNodes = data.projectNodes || {};
  const sibling = React.useRef(null);

  React.useEffect(() => {
    if (visible) {
      onCreate();
    }
  }, [visible]);

  const onCreate = () => {
    sibling.current = new RootSiblings(
      (
        <NodePopupContent
          projectNodes={projectNodes}
          location={location}
          onClose={() => {
            sibling.current?.destroy();
            sibling.current = null;
            onClose && onClose();
          }}
          onChoose={type => {
            sibling.current?.destroy();
            sibling.current = null;
            onChoose && onChoose(type);
          }}
        />
      ),
    );
  };

  return null;
};

const NodePopupContent = props => {
  const {onClose, onChoose, projectNodes, location} = props;

  const anim = React.useRef(new Animated.Value(0));
  const fade = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });
  const fade2 = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  React.useEffect(() => {
    Animated.timing(anim.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start();
  }, []);

  const onNext = devEui => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start(() => {
      onChoose && onChoose(devEui);
      onClose && onClose();
    });
  };

  const onDismiss = () => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start(() => {
      onClose && onClose();
    });
  };

  const renderContent = () => {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
          <TouchableOpacity
            onPress={() => onNext((projectNodes.LEFT || {}).devEui)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: getDeviceColor((projectNodes.LEFT || {}).status),
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
            <MyIcon
              name={getDeviceStateIcon((projectNodes.LEFT || {}).status)}
              size={20}
              light
              color="white"
            />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Left
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Bay {location.bay}
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Level {location.level}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNext((projectNodes.RIGHT || {}).devEui)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: getDeviceColor(
                (projectNodes.RIGHT || {}).status,
              ),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon
              name={getDeviceStateIcon((projectNodes.RIGHT || {}).status)}
              size={20}
              light
              color="white"
            />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Right
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Bay {location.bay}
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Level {location.level}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => onNext((projectNodes.BACK || {}).devEui)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: getDeviceColor((projectNodes.BACK || {}).status),
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
            <MyIcon
              name={getDeviceStateIcon((projectNodes.BACK || {}).status)}
              size={20}
              light
              color="white"
            />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Back
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Bay {location.bay}
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Level {location.level}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNext((projectNodes.WALL || {}).devEui)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: getDeviceColor((projectNodes.WALL || {}).status),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon
              name={getDeviceStateIcon((projectNodes.WALL || {}).status)}
              size={20}
              light
              color="white"
            />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Wall
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Bay {location.bay}
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>
              Level {location.level}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'flex-end',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'black',
          opacity: fade,
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={onDismiss}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          paddingTop: 10,
          paddingHorizontal: 18,
          opacity: fade2,
          // transform: [{translateY: slideY}],
        }}>
        {renderContent()}
        {/* {Platform.OS == "ios" && <KeyboardSpacer topSpacing={-insets.bottom} />} */}
      </Animated.View>
    </View>
  );
};

export default NodePopup;

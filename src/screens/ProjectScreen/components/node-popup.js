import React from 'react';
import {Animated, Easing, Text, TouchableOpacity, View} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import MyIcon from '~/components/MyIcon';
import {DeviceState} from '~/screens/DeviceScreen/utils';

const NodePopup = props => {
  const {visible, onClose, onChoose} = props;

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
  const {onClose, onChoose} = props;

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

  const onNext = type => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start(() => {
      onChoose && onChoose(type);
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
            onPress={() => onNext(DeviceState.ACTIVE)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: colors.green,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
            <MyIcon name="router" size={20} light color="white" />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Left
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Bay 1</Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Level 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNext(DeviceState.PAUSE)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: colors.darkgrey,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon name="pause-circle" size={20} light color="white" />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Right
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Bay 1</Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Level 2</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => onNext(DeviceState.ALERT)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: colors.red,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
            <MyIcon name="bell" size={20} light color="white" />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Back
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Bay 1</Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Level 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNext(DeviceState.CHECK)}
            style={{
              width: 128,
              height: 128,
              borderRadius: 20,
              backgroundColor: colors.yellow,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyIcon name="router" size={20} light color="white" />
            <Text style={{...fonts.type.bold(18, 'white'), marginVertical: 5}}>
              Wall
            </Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Bay 1</Text>
            <Text style={{...fonts.type.base(14, 'white')}}>Level 2</Text>
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

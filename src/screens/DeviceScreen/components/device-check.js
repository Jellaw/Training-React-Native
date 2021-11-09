import React from 'react';
import {Animated, Easing, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RootSiblings from 'react-native-root-siblings';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';

const DeviceCheck = props => {
  const {visible, onClose, onScan} = props;

  const sibling = React.useRef(null);

  const onCreate = () => {
    sibling.current = new RootSiblings(
      (
        <DeviceCheckPopup
          onClose={() => {
            sibling.current?.destroy();
            sibling.current = null;
            onClose && onClose();
          }}
          onScan={type => {
            sibling.current?.destroy();
            sibling.current = null;
            onScan && onScan(type);
          }}
        />
      ),
    );
  };

  React.useEffect(() => {
    if (visible) {
      onCreate();
    }
  }, [visible]);

  return null;
};

const DeviceCheckPopup = props => {
  const {onClose, onScan} = props;

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

  const onBarCodeScanned = async result => {
    if (result.data) {
      onNext(result.data);
    }
  };

  const onNext = type => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start(() => {
      onScan && onScan(type);
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
      <SafeAreaView
        style={{
          backgroundColor: colors.darkgrey,
          paddingHorizontal: 21,
          borderBottomLeftRadius: 26,
          borderBottomRightRadius: 26,
          height: 430,
        }}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, borderRadius: 10, overflow: 'hidden'}}>
            <RNCamera
              onBarCodeRead={onBarCodeScanned}
              style={{flex: 1, borderRadius: 10}}
              captureAudio={false}
            />
          </View>
          <Text
            style={{
              ...fonts.type.base(14, 'white'),
              textAlign: 'center',
              marginTop: 14,
            }}>
            Scan QR code to check if you’re look at the correct device in the
            app.
          </Text>
        </View>
      </SafeAreaView>
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
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 0,
          paddingHorizontal: 16,
          opacity: fade2,
          // transform: [{translateY: slideY}],
        }}>
        {renderContent()}
        {/* {Platform.OS == "ios" && <KeyboardSpacer topSpacing={-insets.bottom} />} */}
      </Animated.View>
    </View>
  );
};

export default DeviceCheck;

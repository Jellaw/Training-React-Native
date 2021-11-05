import React, {useRef, useState} from 'react';
import {Text, Modal, View, Animated, Easing} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import MyIcon from '~/components/MyIcon';

const LoadingPopup = props => {
  const {
    visible,
    showEndMessage = false,
    endIcon,
    endTitle,
    endMessage,
  } = props;
  const [currentVisible, setVisible] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animation = React.useRef(null);

  React.useEffect(() => {
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
      if (visible) {
        animation.current.start();
        setVisible(true);
        setIsEnd(false);
      } else {
        animation.current.stop();
        animation.current = null;
        if (showEndMessage) {
          setIsEnd(true);
          if (currentVisible) {
            setTimeout(() => {
              setVisible(false);
            }, 1500);
          }
        } else {
          setVisible(false);
        }
      }
    }
  }, [visible]);

  return (
    <Modal visible={currentVisible} transparent={true} animationType="fade">
      <View
        style={{backgroundColor: '#00000099', flex: 1, paddingHorizontal: 15}}>
        <SafeAreaView
          style={{
            backgroundColor: colors.darkgrey,
            paddingHorizontal: 21,
            borderBottomLeftRadius: 26,
            borderBottomRightRadius: 26,
            paddingBottom: 31,
            height: 430,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            {isEnd ? (
              <MyIcon name={endIcon} size={70} color="white" light />
            ) : (
              <Animated.View style={{transform: [{rotate: rotate}]}}>
                <MyIcon name="sync-alt" size={70} color="white" light />
              </Animated.View>
            )}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{...fonts.type.medium(32, 'white')}}>
              {isEnd ? endTitle : 'Please wait'}
            </Text>
            <Text style={{...fonts.type.bold(16, 'white'), marginTop: 10}}>
              {isEnd ? endMessage : 'We are trying to find the device'}
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default LoadingPopup;

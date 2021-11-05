import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  Easing,
} from 'react-native';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';
import MyIcon from '~/components/MyIcon';
import {SafeAreaView} from 'react-native';
import routes from '~/navigation/routes';
import images from '~/assets/images';
import {RNCamera} from 'react-native-camera';
import {getCheckNode} from '~/store/node/actions';
import {isEmpty} from '~/helpers/validate';

function QrCode({navigation}) {
  const [loading, setLoading] = useState(false);

  const anim = useRef(new Animated.Value(0)).current;
  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const animation = React.useRef(null);

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

  const renderQRCodeContainer = () => {
    const delay = interval => {
      return new Promise(res => setTimeout(res, interval));
    };

    const onBarCodeScanned = async result => {
      if (result.data) {
        setLoading(true);
        const check = await getCheckNode({devEui: result.data});
        if (!isEmpty(check)) {
          await delay(2000);
          navigation.navigate(routes.DEVICE_DETAIL, {
            status: check.status,
            data: check,
          });
          return setLoading(false);
        }
        await delay(2000);
        navigation.navigate(routes.DEVICE_DETAIL, {
          status: 'UNRECOG',
          devEui: result.data,
        });
        return setLoading(false);
      }
    };
    return (
      <View
        style={{
          alignSelf: 'stretch',
          padding: 15,
          borderRadius: 10,
          marginTop: 60,
        }}>
        <View
          style={{
            width: '100%',
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
            <>
              <RNCamera
                onBarCodeRead={onBarCodeScanned}
                captureAudio={false}
                style={{flex: 1}}
              />
              {/* <Text
                  style={{
                    ...fonts.type.base(14, colors.red),
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                  }}>
                  Scan New Device
                </Text> */}
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 36, flex: 1, alignItems: 'center'}}>
        <Image source={images.logo} style={{marginTop: 10}} />
        <Text style={{...fonts.type.bold(16), marginTop: 23}}>
          Scan Safe-T Device
        </Text>
        <Text
          style={{
            ...fonts.type.medium(16),
            marginTop: 20,
            textAlign: 'center',
          }}>
          Scan QR code on the Safe-T Device in order to locate it on a
          scaffolding.
        </Text>
        {renderQRCodeContainer()}
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 45,
          alignItems: 'center',
          paddingTop: 16,
        }}>
        <Text style={{...fonts.type.bold(16, colors.purple)}}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default QrCode;

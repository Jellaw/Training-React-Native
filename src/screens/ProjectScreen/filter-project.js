import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import MyIcon from '~/components/MyIcon';

const FilterProject = props => {
  const {visible, onClose, onConfirm, selectedType, onSubmitFilter} = props;
  const sibling = React.useRef(null);

  React.useEffect(() => {
    if (visible) {
      onCreate();
    }
  }, [visible]);

  const onCreate = () => {
    sibling.current = new RootSiblings(
      (
        <FilterProjectPopup
          selectedType={selectedType}
          onClose={() => {
            sibling.current?.destroy();
            sibling.current = null;
            onClose && onClose();
          }}
          onSubmitFilter={type => {
            sibling.current?.destroy();
            sibling.current = null;
            onSubmitFilter && onSubmitFilter(type);
          }}
          onConfirm={type => {
            // sibling.current?.destroy();
            // sibling.current = null;
            onConfirm && onConfirm(type);
          }}
        />
      ),
    );
  };

  return null;
};

const FilterProjectPopup = props => {
  const {onClose, onConfirm, selectedType, onSubmitFilter} = props;
  const [select, setSelect] = useState(selectedType);

  const popupHeight = React.useRef(Dimensions.get('window').height);
  const anim = React.useRef(new Animated.Value(0));
  const slideY = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [popupHeight.current, 0],
  });
  const fade = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  React.useEffect(() => {
    Animated.timing(anim.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start();
  }, []);

  const submitFilter = () => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start(() => {
      onSubmitFilter && onSubmitFilter(select);
      onClose && onClose();
    });
  };

  const onReset = type => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start(() => {
      onConfirm && onConfirm(type);
      onSubmitFilter && onSubmitFilter(type);
      onClose && onClose();
    });
  };

  const onNext = type => {
    onConfirm && onConfirm(type);
    setSelect(type);
    // Animated.timing(anim.current, {
    //   toValue: 0,
    //   duration: 500,
    //   easing: Easing.elastic(0.8),
    //   useNativeDriver: true,
    // }).start(() => {
    //   onConfirm && onConfirm(type);
    //   onClose && onClose();
    // });
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

  const renderItem = (icon, title, type) => {
    return (
      <TouchableOpacity
        key={type.toString()}
        onPress={() => onNext(type)}
        style={{height: 60, flexDirection: 'row', alignItems: 'center'}}>
        <MyIcon name={icon} size={14} color={colors.grey} />
        <Text style={{...fonts.type.semibold(16), flex: 1, marginLeft: 10}}>
          {title}
        </Text>
        {select === type && (
          <MyIcon name="check" solid size={19} color={colors.purple} />
        )}
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return (
      <View>
        <View
          style={{
            width: 36,
            height: 4,
            backgroundColor: colors.grey,
            borderRadius: 2,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{...fonts.type.bold(17)}}>Filters</Text>
          <TouchableOpacity
            onPress={() => onReset(undefined)}
            style={{position: 'absolute', right: 16}}>
            <Text style={{...fonts.type.bold(14, colors.grey)}}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 10, marginBottom: 20}}>
          {renderItem('router', 'Active', 'ACTIVE')}
          {renderItem('pause-circle', 'Inactive', 'INACTIVE')}
        </View>
        <TouchableOpacity
          onPress={submitFilter}
          style={{
            height: 44,
            backgroundColor: colors.purple,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{...fonts.type.bold(16, 'white')}}>Show Results</Text>
        </TouchableOpacity>
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
          paddingBottom: 29,
          paddingTop: 10,
          paddingHorizontal: 18,
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          transform: [{translateY: slideY}],
        }}>
        {renderContent()}
        {/* {Platform.OS == "ios" && <KeyboardSpacer topSpacing={-insets.bottom} />} */}
      </Animated.View>
    </View>
  );
};

export default FilterProject;

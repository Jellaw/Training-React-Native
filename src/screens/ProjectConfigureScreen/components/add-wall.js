import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {Platform} from 'react-native';
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  BackHandler,
  TouchableOpacity,
  View,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import {Form, FormField, SubmitButton} from '~/components/forms';
import MyIcon from '~/components/MyIcon';
import styles from '../styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  createProjectDeviceLocation,
  deleteProjectDeviceLocation,
  updateProjectDeviceLocation,
} from '~/store/project/actions';
import ROLES from '~/constants/permissions';

const AddWall = props => {
  const {
    arrWall,
    data,
    parentId,
    projectId,
    visible,
    onClose,
    onConfirm,
    isEdit,
    setIsDelete,
  } = props;

  const sibling = React.useRef(null);

  React.useEffect(() => {
    if (visible) {
      onCreate();

      const backAction = () => {
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [visible]);

  const onCreate = () => {
    sibling.current = new RootSiblings(
      (
        <AddWallPopup
          arrWall={arrWall}
          data={data || {}}
          parentId={parentId}
          projectId={projectId}
          isEdit={isEdit}
          setIsDelete={setIsDelete}
          onClose={() => {
            sibling.current?.destroy();
            sibling.current = null;
            onClose && onClose();
          }}
          onConfirm={type => {
            sibling.current?.destroy();
            sibling.current = null;
            onConfirm && onConfirm(type);
          }}
        />
      ),
    );
  };

  return null;
};

const AddWallPopup = props => {
  const dispatch = useDispatch();
  const {arrWall, data, parentId, projectId, onClose, isEdit, setIsDelete} =
    props;
  const insets = useSafeAreaInsets();
  const {roles} = useSelector(state => state.me);

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
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .required()
        .test(function (value) {
          const {path, createError} = this;
          if (
            ((arrWall || {}).children || []).find(item => {
              return item.name == value;
            })
          ) {
            return createError({path, message: 'Duplicate Wall'});
          }
          return true;
        })
        .label('Wall Name'),
    });

    const handleSubmit = ({name}) => {
      if (isEdit) {
        dispatch(
          updateProjectDeviceLocation(projectId, data.id, {
            name: name,
          }),
        );
        return onClose();
      }
      dispatch(
        createProjectDeviceLocation(projectId, {
          name: name,
          parentId: parentId,
        }),
      );
      onClose();
    };

    const handleDelete = () => {
      setIsDelete(true);
      dispatch(deleteProjectDeviceLocation(projectId, data.id));
      onClose();
    };
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
          <Text style={{...fonts.type.bold(17)}}>
            {isEdit ? 'Edit Wall' : 'Add Wall'}
          </Text>
          <TouchableOpacity
            onPress={onDismiss}
            style={{position: 'absolute', right: 16}}>
            <MyIcon name="times" size={20} color={colors.purple} />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <View>
            <Form
              initialValues={{name: (isEdit && data.name) || ''}}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              <Text style={styles.inputLabel}>Wall Name</Text>
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="name"
                placeholder="Wall Name"
              />
              {roles.includes(ROLES.PROJECT_DELETE) && isEdit && (
                <View style={{marginTop: 15, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={handleDelete}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MyIcon name="trash" size={16} color={colors.grey} />
                    <Text
                      style={{
                        ...fonts.type.bold(14, colors.grey),
                        marginLeft: 5,
                      }}>
                      Delete Wall
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <SubmitButton stylesBtn={styles.submitButton} title="Save" />
            </Form>
          </View>
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
          paddingBottom: 29,
          paddingTop: 10,
          paddingHorizontal: 18,
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          transform: [{translateY: slideY}],
        }}>
        {renderContent()}
        {Platform.OS === 'ios' && (
          <KeyboardSpacer topSpacing={-insets.bottom} />
        )}
      </Animated.View>
    </View>
  );
};

export default AddWall;

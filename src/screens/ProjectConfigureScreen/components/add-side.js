import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {Platform} from 'react-native';
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import {Form, SubmitButton} from '~/components/forms';
import MyIcon from '~/components/MyIcon';
import styles from '../styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  createProjectDeviceLocation,
  deleteProjectDeviceLocation,
} from '~/store/project/actions';
import ROLES from '~/constants/permissions';
import {isDevEui} from '~/helpers/common';
import AppFormField from '~/components/forms/FormField';
import routes from '~/navigation/routes';

const AddSide = props => {
  const {
    data,
    nameSide,
    parentId,
    projectId,
    visible,
    onClose,
    onConfirm,
    isEdit,
    navigation,
  } = props;

  const sibling = React.useRef(null);

  React.useEffect(() => {
    if (visible) {
      onCreate();
    }
  }, [visible]);

  const onCreate = () => {
    sibling.current = new RootSiblings(
      (
        <AddSidePopup
          navigation={navigation}
          data={data || {}}
          nameSide={nameSide}
          parentId={parentId}
          projectId={projectId}
          isEdit={isEdit}
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

const AddSidePopup = props => {
  const dispatch = useDispatch();
  const {data, nameSide, parentId, projectId, onClose, isEdit, navigation} =
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
      devEui: Yup.string()
        .required()
        .test(function (value) {
          const {path, createError} = this;
          if (!isDevEui(value)) {
            return createError({path, message: 'DevEui incorrect'});
          }
          return true;
        })
        .label('DevEui'),
    });

    const handleSubmit = async ({devEui}) => {
      const dataCreate = await dispatch(
        createProjectDeviceLocation(projectId, {
          parentId: parentId,
          name: nameSide,
        }),
      );
      navigation.navigate(routes.ADD_DEVEUI, {
        projectId: projectId,
        deviceLocationTreeId: (dataCreate.data || {}).id,
        devEui: devEui,
      });
      onClose();
    };

    const handleDelete = () => {
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
            {isEdit ? 'Edit Project Node' : 'Add Project Node'}
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
              initialValues={{devEui: ''}}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              <Text style={styles.inputLabel}>DevEui</Text>
              <AppFormField name="devEui" />
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
                      Delete Bay
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <SubmitButton stylesBtn={styles.submitButton} title="Next" />
              <TouchableOpacity
                onPress={() => onDismiss()}
                style={styles.button}>
                <Text
                  style={{
                    ...fonts.type.bold(16, colors.purple),
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
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

export default AddSide;

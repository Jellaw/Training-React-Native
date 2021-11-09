import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
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
import {Form, FormField, SubmitButton} from '~/components/forms';
import MyIcon from '~/components/MyIcon';
import styles from '../styles';
import AppFormPicker from '~/components/forms/FormPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createProject, updateProject} from '~/store/project/actions';

const CreateProject = props => {
  const {data, visible, onClose, onConfirm, isEdit} = props;
  const listCompany = useSelector(state => state.company.data);
  const ttnApplicationList = useSelector(state => state.ttnApplication.data);
  const sibling = React.useRef(null);

  React.useEffect(() => {
    if (visible) {
      onCreate();
    }
  }, [visible]);

  const onCreate = () => {
    sibling.current = new RootSiblings(
      (
        <CreateProjectPopup
          data={data || {}}
          ttnApplicationList={ttnApplicationList}
          listCompany={listCompany}
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

const CreateProjectPopup = props => {
  const dispatch = useDispatch();
  const {data, onClose, isEdit, listCompany, ttnApplicationList} = props;
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(data.status === 'ACTIVE' ? true : false);
  }, []);
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

  // const onNext = type => {
  //   Animated.timing(anim.current, {
  //     toValue: 0,
  //     duration: 500,
  //     easing: Easing.elastic(0.8),
  //     useNativeDriver: true,
  //   }).start(() => {
  //     onConfirm && onConfirm(type);
  //     onClose && onClose();
  //   });
  // };

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

  const renderRadio = () => {
    const activeFont = fonts.type.bold(14, 'white');
    const inactiveFont = fonts.type.base(14, colors.grey);
    return (
      <View
        style={{
          height: 44,
          borderRadius: 14,
          borderWidth: 2,
          borderColor: '#E9EAF0',
          flexDirection: 'row',
          alignSelf: 'flex-start',
          padding: 4,
          backgroundColor: '#F6F7FB',
        }}>
        <TouchableOpacity
          onPress={() => setIsActive(true)}
          style={{
            backgroundColor: isActive ? colors.purple : 'transparent',
            paddingHorizontal: 10,
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <Text style={isActive ? {...activeFont} : {...inactiveFont}}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsActive(false)}
          style={{
            backgroundColor: !isActive ? colors.purple : 'transparent',
            borderRadius: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <Text style={!isActive ? {...activeFont} : {...inactiveFont}}>
            Inactive
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    const validationSchema = Yup.object().shape({
      companyId: Yup.string().required().label('Company'),
      name: Yup.string().required().label('Project Name'),
    });

    const handleSubmit = ({
      companyId,
      name,
      location,
      defaultApplicationId,
    }) => {
      if (isEdit) {
        dispatch(
          updateProject(data.id, {
            companyId: companyId,
            name: name,
            location: location,
            status: isActive ? 'ACTIVE' : 'INACTIVE',
            defaultApplicationId: defaultApplicationId,
          }),
        );
        return onClose();
      }
      dispatch(
        createProject({
          companyId: companyId,
          name: name,
          location: location,
          status: isActive ? 'ACTIVE' : 'INACTIVE',
          defaultApplicationId: defaultApplicationId,
        }),
      );
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
            {isEdit ? 'Edit Project Details' : 'Create Project'}
          </Text>
          <TouchableOpacity
            onPress={onDismiss}
            style={{position: 'absolute', right: 16}}>
            <MyIcon name="times" size={20} color={colors.purple} />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView style={{paddingHorizontal: 10, marginTop: 10}}>
          <View>
            <Form
              initialValues={{
                companyId: (data.company || {}).id || '',
                name: data.name || '',
                location: data.location || '',
                defaultApplicationId: data.defaultApplicationId || '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {/* <Text style={styles.inputLabel}>TTN Application</Text>
              <AppFormPicker placeholder="Select TTN Application" /> */}
              <Text style={styles.inputLabel}>Company</Text>
              <AppFormPicker
                name="companyId"
                data={listCompany || []}
                placeholder="Select Company"
              />
              <Text style={styles.inputLabel}>Project Name</Text>
              <FormField
                // value={data.name}
                autoCapitalize="none"
                autoCorrect={false}
                name="name"
                placeholder="Type Project Name"
              />
              <Text style={styles.inputLabel}>Type Site/Location Name</Text>
              <FormField
                // value={data.location}
                autoCapitalize="none"
                autoCorrect={false}
                name="location"
                placeholder="Type Site/Location Name"
              />
              <Text style={styles.inputLabel}>TTN Application</Text>
              <AppFormPicker
                name="defaultApplicationId"
                data={ttnApplicationList || []}
                placeholder="Select TTN Application"
              />
              <Text style={styles.inputLabel}>Status</Text>
              {renderRadio()}
              <SubmitButton stylesBtn={styles.submitButton} title="Save" />
            </Form>
          </View>
        </KeyboardAwareScrollView>
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
      </Animated.View>
    </View>
  );
};

export default CreateProject;

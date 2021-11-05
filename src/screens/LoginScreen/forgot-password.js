import React, {useEffect} from 'react';
import {ScrollView, Text, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import Screen from '~/components/Screen';
import {Form, FormField, SubmitButton} from '~/components/forms';
import {ButtonLink} from '~/components/Button';
import styles from './styles';
import AppText from '~/components/AppText';
import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import {reqForGotPassword} from '~/store/auth/actions';
import {authSlice} from '~/store/auth/reducer';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

function ForgotPasswordScreen({navigation}) {
  const dispatch = useDispatch();
  const {forGotPw} = useSelector(state => state.auth);
  const {forGotPassword} = authSlice.actions;

  const handleSubmit = ({email}) => {
    dispatch(reqForGotPassword({email}));
  };

  const handleClose = () => {
    navigation.goBack();
    dispatch(forGotPassword(false));
  };

  useEffect(() => {
    if (forGotPw) {
      Alert.alert(
        'Password recovery successful',
        'New password has been sent to your email, please check before logging in',
        [
          {
            text: 'Back to Login',
            onPress: handleClose,
          },
          {
            text: 'Close',
            onPress: () => dispatch(forGotPassword(false)),
            style: 'cancel',
          },
        ],
      );
    }
  }, [forGotPw]);

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <AppText text="Forgot Password" style={styles.titleHead} />
        <AppText
          text="Please enter email below and we will send you a password reset link."
          style={{...fonts.type.base(16)}}
        />
        <Form
          initialValues={{email: ''}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <Text
            style={{...fonts.type.bold(12), marginBottom: 5, marginTop: 24}}>
            Email
          </Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            // icon="account"
            keyboardType="email-address"
            name="email"
            placeholder="Enter email address"
            textContentType="emailAddress"
          />
          <SubmitButton
            stylesBtn={{
              height: 44,
              backgroundColor: colors.purple,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
            }}
            title="Continue"
          />
        </Form>
        <ButtonLink
          title="Back to Login"
          styles={styles.btnLink}
          onPress={navigation.goBack}
        />
      </Screen>
    </ScrollView>
  );
}

export default ForgotPasswordScreen;

import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import * as Yup from 'yup';
import AppText from '~/components/AppText';
import {ButtonLink} from '~/components/Button';

import Screen from '~/components/Screen';
import {Form, FormField, SubmitButton} from '~/components/forms';
import {logInWithEmail} from '~/store/auth/actions';
import routes from '~/navigation/routes';
import styles from './styles';
import fonts from '~/assets/fonts';
import colors from '~/assets/colors';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email address'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const handleSubmit = async ({email, password}) => {
    await messaging().registerDeviceForRemoteMessages();
    const deviceToken = await messaging().getToken();

    dispatch(logInWithEmail({email, password, deviceToken}));
  };

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <AppText text="Login" style={styles.titleHead} />
        <Form
          initialValues={{email: '', password: ''}}
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
          <Text
            style={{...fonts.type.bold(12), marginBottom: 5, marginTop: 24}}>
            Password
          </Text>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            // icon="key"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton
            stylesBtn={{
              height: 44,
              backgroundColor: colors.purple,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 30,
            }}
            title="Login"
          />
        </Form>

        <ButtonLink
          title="Forgot password"
          styles={styles.btnLink}
          onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)}
        />
      </Screen>
    </ScrollView>
  );
}

export default LoginScreen;

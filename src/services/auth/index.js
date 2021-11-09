import {publicClient} from '../utils';
import md5 from 'md5';

export const login = (email, password, deviceToken) => {
  return publicClient.post('/v1/auth/sign-in', {
    email,
    password: md5(password),
    deviceToken,
  });
};

export const forgotPassword = email => {
  return publicClient.post('/v1/auth/forgot-password', {email});
};

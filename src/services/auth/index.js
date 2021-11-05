import {publicClient} from '../utils';
import md5 from 'md5';

export const login = (email, password) => {
  return publicClient.post('/v1/auth/sign-in', {
    email,
    password: md5(password),
  });
};

export const forgotPassword = email => {
  return publicClient.post('/v1/auth/forgot-password', {email});
};

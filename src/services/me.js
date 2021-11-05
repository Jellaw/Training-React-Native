import {loggedInClient} from './utils';

export const getMe = () => {
  return loggedInClient.get('/v1/me').then(res => res.data);
};

export const changePassword = data => {
  return loggedInClient.post('/v1/me/change-password', data);
};

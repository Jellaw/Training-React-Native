import {authSlice} from './reducer';

import * as meActions from '~/store/me/actions';

import * as authAPI from '~/services/auth';
import * as meAPI from '~/services/me';
import tokenStorage from '~/services/auth/token-storage';
import {loggedInClient} from '~/services/utils';

import {LOGIN_FAILED} from '~/constants/error-message';

export const {setToken, logIn, logOut, logInFailed, forGotPassword} =
  authSlice.actions;

export const reqForGotPassword =
  ({email}) =>
  async dispatch => {
    await authAPI
      .forgotPassword(email)
      .then(() => dispatch(exports.forGotPassword(true)))
      .catch(() => {
        dispatch(exports.forGotPassword(false));
      });
  };

export const logInWithToken =
  ({token}) =>
  async dispatch => {
    dispatch(exports.setToken(token));
    loggedInClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    tokenStorage.setToken(token);

    const me = await meAPI.getMe();

    dispatch(exports.logIn());
    dispatch(meActions.setMe(me));
  };

export const logInWithEmail =
  ({email, password, callBack}) =>
  async dispatch => {
    await authAPI
      .login(email, password)
      .then(data => dispatch(exports.logInWithToken({token: data.data.token})))
      .catch(() => dispatch(exports.logInFailed(LOGIN_FAILED)));
    //TODO: rederect to a screen
    return callBack && callBack();
  };

export const logOutApp = () => dispatch => {
  dispatch(meActions.setMe({}));
  dispatch(exports.setToken(''));
  tokenStorage.setToken('');
  return dispatch(exports.logOut());
};

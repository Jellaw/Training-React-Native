import axios from 'axios';
import qs from 'qs';
import {BASE_URL} from '~/config';
import store from '~/store';
import {logOutApp} from '~/store/auth/actions';

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const AxiosWrapper = options => {
  const client = axios.create(options);

  const wrapFunc = async (callbackFunc, url, params) => {
    if (params) {
      Object.keys(params).forEach(k => {
        if (
          typeof (params[k] || {}).regex === 'string' ||
          (params[k] || {}).regex instanceof String
        ) {
          params[k].regex = params[k].regex.trim();
        }
        params[k] === '' && delete params[k];
      });
    }
    const query = params
      ? '?' + qs.stringify(params, {skipNulls: true, skipEmptyStrings: true})
      : '';
    const throwErr = errors => {
      store.dispatch({
        type: 'error/throwError',
        payload: {errors},
      });
    };

    const dropError = () => {
      store.dispatch({type: 'error/dropError'});
    };

    return callbackFunc(url + query, params)
      .then(({data}) => (dropError(), data))
      .catch(function (error) {
        if (error.response) {
          if (
            error.response.status &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            throwErr(error.response.data);
            if (error.response.status === 401) {
              store.dispatch(logOutApp());
            }
            throw '';
          }
        }
      });
  };
  return {
    ...client,
    get: (url, params) => wrapFunc(client.get, url, params),
    post: (url, params) => wrapFunc(client.post, url, params),
    put: (url, params) => wrapFunc(client.put, url, params),
    delete: (url, params) => wrapFunc(client.delete, url, params),
  };
};

export const publicClient = AxiosWrapper(defaultOptions);
export const loggedInClient = AxiosWrapper(defaultOptions);

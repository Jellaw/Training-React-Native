import {ttnApplicationSlice} from './reducer';
import ttnApplicationAPI from '~/services/ttn-applycation';

export const {ttnApplicationList, deviceApplication} =
  ttnApplicationSlice.actions;

export const getTtnAplicationList = query => async dispatch => {
  await ttnApplicationAPI
    .getTtnApplicationList(query)
    .then(data => dispatch(exports.ttnApplicationList(data.data)))
    .catch();
};

export const getDevicesApplication = (id, query) => async dispatch => {
  await ttnApplicationAPI
    .getDevicesApplication(id, query)
    .then(data => dispatch(exports.deviceApplication(data.data)))
    .catch();
};

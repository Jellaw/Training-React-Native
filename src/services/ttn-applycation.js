import {loggedInClient} from './utils';

const getTtnApplicationList = data => {
  return loggedInClient.get('/v1/ttn/applications', data);
};

const getDevicesApplication = (id, data) => {
  return loggedInClient.get(`/v1/ttn/applications/${id}/devices`, data);
};

export default {
  getTtnApplicationList,
  getDevicesApplication,
};

import {loggedInClient} from './utils';

const getProjectHistories = (projectId, data) => {
  return loggedInClient.get(`/v1/projects/${projectId}/histories`, data);
};

const getDashboard = data => {
  return loggedInClient.get('/v1/dashboard', data);
};

const getProjectList = data => {
  return loggedInClient.get('/v1/projects', data);
};

const getProjectDetail = (id, data) => {
  return loggedInClient.get('/v1/projects/' + id, data);
};

const postProjectCreate = data => {
  return loggedInClient.post('/v1/projects', data);
};

const postProjectUpdate = (id, data) => {
  return loggedInClient.put('/v1/projects/' + id, data);
};

const postProjectDelete = (id, data) => {
  return loggedInClient.delete('/v1/projects/' + id, data);
};

const getProjectDeviceLocation = (projectId, id, data) => {
  return loggedInClient.get(
    `/v1/projects/${projectId}/device-location-trees/${id}`,
    data,
  );
};

const postProjectDeviceLocationCreate = (projectId, data) => {
  return loggedInClient.post(
    `/v1/projects/${projectId}/device-location-trees`,
    data,
  );
};

const postProjectDeviceLocationUpdate = (projectId, id, data) => {
  return loggedInClient.put(
    `/v1/projects/${projectId}/device-location-trees/${id}`,
    data,
  );
};

const postProjectDeviceLocationDelete = (projectId, id, data) => {
  return loggedInClient.delete(
    `/v1/projects/${projectId}/device-location-trees/${id}`,
    data,
  );
};

const getProjectContactList = (projectId, data) => {
  return loggedInClient.get(`/v1/projects/${projectId}/contacts`, data);
};

const postProjectNodeCreate = (projectId, data) => {
  return loggedInClient.post(`/v1/projects/${projectId}/nodes`, data);
};

const postProjectForceLink = (projectId, data) => {
  return loggedInClient.post(`/v1/projects/${projectId}/force-link`, data);
};

const postProjectBulkAction = (projectId, type, data) => {
  return loggedInClient.post(
    `/v1/projects/${projectId}/bulk-action/${type}`,
    data,
  );
};
export default {
  getProjectHistories,
  getDashboard,
  getProjectList,
  getProjectDetail,
  postProjectCreate,
  postProjectUpdate,
  postProjectDelete,
  getProjectDeviceLocation,
  postProjectDeviceLocationCreate,
  postProjectDeviceLocationUpdate,
  postProjectDeviceLocationDelete,
  getProjectContactList,
  postProjectNodeCreate,
  postProjectForceLink,
  postProjectBulkAction,
};

import {projectSlice} from './reducer';
import projectAPI from '~/services/project';

export const {
  projectList,
  projectDetail,
  setIsCreate,
  setIsUpdate,
  projectDeviceLocation,
  setIsCreateDeviceLocation,
  setIsUpdateDeviceLocation,
  setIsDeleteDeviceLocation,
  projectContact,
  setIsCreateProjectNode,
  setIsCreateProjectForceLink,
  setIsProjectBulkAction,
} = projectSlice.actions;

export const getProjectList = query => async dispatch => {
  await projectAPI
    .getProjectList(query)
    .then(data => dispatch(exports.projectList(data.data)))
    .catch();
};

export const getProjectDetail = id => async dispatch => {
  await projectAPI
    .getProjectDetail(id)
    .then(data => dispatch(exports.projectDetail(data.data)))
    .catch();
};

export const createProject = data => dispatch => {
  return projectAPI
    .postProjectCreate(data)
    .then(data => {
      dispatch(exports.setIsCreate(true));
      return data;
    })
    .catch(() => dispatch(exports.setIsCreate(false)));
};

export const updateProject = (id, data) => dispatch => {
  return projectAPI
    .postProjectUpdate(id, data)
    .then(data => {
      dispatch(exports.setIsUpdate(true));
      return data;
    })
    .catch(() => dispatch(exports.setIsUpdate(false)));
};

export const getProjectDeviceLocation = (projectId, id, data) => dispatch => {
  return projectAPI
    .getProjectDeviceLocation(projectId, id, data)
    .then(data => {
      dispatch(exports.projectDeviceLocation(data.data));
      return data;
    })
    .catch();
};

export const createProjectDeviceLocation = (projectId, data) => dispatch => {
  // data = {name, parentId}
  return projectAPI
    .postProjectDeviceLocationCreate(projectId, data)
    .then(data => {
      dispatch(exports.setIsCreateDeviceLocation(true));
      return data;
    })
    .catch(() => dispatch(exports.setIsCreateDeviceLocation(false)));
};

export const updateProjectDeviceLocation =
  (projectId, id, data) => dispatch => {
    return projectAPI
      .postProjectDeviceLocationUpdate(projectId, id, data)
      .then(data => {
        dispatch(exports.setIsUpdateDeviceLocation(true));
        return data;
      })
      .catch(() => dispatch(exports.setIsUpdateDeviceLocation(false)));
  };

export const deleteProjectDeviceLocation =
  (projectId, id, data) => dispatch => {
    return projectAPI
      .postProjectDeviceLocationDelete(projectId, id, data)
      .then(() => {
        dispatch(exports.setIsDeleteDeviceLocation(true));
        return true;
      })
      .catch(() => dispatch(exports.setIsDeleteDeviceLocation(false)));
  };

export const getProjectContactList = (projectId, data) => dispatch => {
  return projectAPI
    .getProjectContactList(projectId, data)
    .then(data => {
      dispatch(exports.projectContact(data.data));
      return data;
    })
    .catch();
};

export const createProjectNode = (projectId, data) => dispatch => {
  return projectAPI
    .postProjectNodeCreate(projectId, data)
    .then(data => {
      dispatch(exports.setIsCreateProjectNode(true));
      return data;
    })
    .catch(() => dispatch(exports.setIsCreateProjectNode(false)));
};

export const createProjectForceLink = (projectId, data) => dispatch => {
  return projectAPI
    .postProjectForceLink(projectId, data)
    .then(data => {
      dispatch(exports.setIsCreateProjectForceLink(true));
      return data;
    })
    .catch(() => dispatch(exports.setIsCreateProjectForceLink(false)));
};

export const ProjectBulkAction = (projectId, type, data) => dispatch => {
  return projectAPI
    .postProjectBulkAction(projectId, type, data)
    .then(data => {
      dispatch(exports.setIsProjectBulkAction(true));
      return data;
    })
    .catch(() => dispatch(exports.setIsProjectBulkAction(false)));
};

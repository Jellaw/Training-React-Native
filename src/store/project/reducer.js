import {createSlice} from '@reduxjs/toolkit';

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    data: [],
    overView: {},
    obj: {},
    isCreate: false,
    isUpdate: false,
    projectDeviceLocation: {},
    isCreateDeviceLocation: false,
    isUpdateDeviceLocation: false,
    isDeleteDeviceLocation: false,
    contact: [],
    isCreateProjectNode: false,
    isCreateProjectForceLink: false,
    isProjectBulkAction: false,
  },
  reducers: {
    projectList: (state, action) => {
      state.data = action.payload.data;
      state.overView = action.payload.overView;
    },
    projectDetail: (state, action) => {
      state.obj = action.payload;
    },
    setIsCreate: (state, action) => {
      state.isCreate = action.payload;
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    projectDeviceLocation: (state, action) => {
      state.projectDeviceLocation = action.payload;
    },
    setIsCreateDeviceLocation: (state, action) => {
      state.isCreateDeviceLocation = action.payload;
    },
    setIsUpdateDeviceLocation: (state, action) => {
      state.isUpdateDeviceLocation = action.payload;
    },
    setIsDeleteDeviceLocation: (state, action) => {
      state.isDeleteDeviceLocation = action.payload;
    },
    projectContact: (state, action) => {
      state.contact = action.payload.data;
    },
    setIsCreateProjectNode: (state, action) => {
      state.isCreateProjectNode = action.payload;
    },
    setIsCreateProjectForceLink: (state, action) => {
      state.isCreateProjectForceLink = action.payload;
    },
    setIsProjectBulkAction: (state, action) => {
      state.isProjectBulkAction = action.payload;
    },
  },
});

export default projectSlice.reducer;

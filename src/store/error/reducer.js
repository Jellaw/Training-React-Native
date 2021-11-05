import {createSlice} from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    isErr: false,
    isNoti: false,
    message: '',
    noti: '',
    type: '',
  },
  reducers: {
    throwError: (state, action) => {
      state.message = action.payload.errors;
      state.isErr = true;
    },
    dropError: state => {
      state.message = '';
      state.isErr = false;
    },
    notification: (state, action) => {
      state.noti = action.payload.message;
      state.type = action.payload.type;
      state.isNoti = true;
    },
    dropNoti: state => {
      state.noti = '';
      state.type = '';
      state.isNoti = false;
    },
  },
});

export default errorSlice.reducer;

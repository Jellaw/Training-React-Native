import {createSlice} from '@reduxjs/toolkit';

export const ttnApplicationSlice = createSlice({
  name: 'ttnApplication',
  initialState: {
    data: [],
    device: [],
  },
  reducers: {
    ttnApplicationList: (state, action) => {
      state.data = action.payload.data;
    },
    deviceApplication: (state, action) => {
      state.device = action.payload.data;
    },
  },
});

export default ttnApplicationSlice.reducer;

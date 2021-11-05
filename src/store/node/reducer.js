import {createSlice} from '@reduxjs/toolkit';

export const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    data: [],
    obj: {},
  },
  reducers: {
    nodeList: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export default nodeSlice.reducer;

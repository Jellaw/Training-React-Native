import {createSlice} from '@reduxjs/toolkit';

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    data: [],
    detail: {},
  },
  reducers: {
    companyList: (state, action) => {
      state.data = action.payload.data;
    },
    companyDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export default companySlice.reducer;

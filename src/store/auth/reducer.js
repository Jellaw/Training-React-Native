import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    token: '',
    error: null,
    forGotPw: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logIn: state => {
      state.loggedIn = true;
    },
    logInFailed: (state, action) => {
      state.loggedIn = false;
      state.error = action.payload;
    },
    logOut: state => {
      state.loggedIn = false;
      state.error = null;
    },
    forGotPassword: (state, action) => {
      state.forGotPw = action.payload;
    },
  },
});

export default authSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

export const meSlice = createSlice({
  name: 'me',
  initialState: {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    avatar: '',
    isActive: false,
    roles: [],
    userGroup: {},
    company: {},
  },
  reducers: {
    setMe: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstname;
      state.lastName = action.payload.surname;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.isActive = action.payload.isActive;
      state.userGroup = action.payload.userGroup;
      state.company = action.payload.company;

      if (action.payload.userGroup) {
        state.roles = action.payload.userGroup.roles;
      }
    },
  },
});

export default meSlice.reducer;

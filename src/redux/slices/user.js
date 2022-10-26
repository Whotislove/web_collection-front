import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: {},
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserInfo(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logOut(state) {
      state.user = {};
      state.isAuth = false;
    },
  },
});
export const { addUserInfo, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;

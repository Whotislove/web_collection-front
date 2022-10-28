import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: {},
  isAuth: false,
  theme: 'light',
  language: 'ru',
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
    changeTheme(state, action) {
      state.theme = action.payload;
    },
    changeLanguage(state, action) {
      state.language = action.payload;
    },
  },
});
export const { addUserInfo, logOut, changeTheme, changeLanguage } = userSlice.actions;
export const userReducer = userSlice.reducer;
